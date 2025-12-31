import jsPDF from "jspdf";
import { Routine, Activity } from "@/types/routine";
import { ACTIVITY_PNG_ICONS } from "@/data/activityIcons";
import { CATEGORY_LABELS } from "@/data/activities";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { Capacitor } from "@capacitor/core";

// Category colors for PDF (RGB values)
const PDF_CATEGORY_COLORS: Record<string, [number, number, number]> = {
  morning: [251, 191, 36],    // amber-400
  hygiene: [96, 165, 250],    // blue-400
  meals: [74, 222, 128],      // green-400
  play: [192, 132, 252],      // purple-400
  learning: [251, 146, 60],   // orange-400
  evening: [129, 140, 248],   // indigo-400
  clothing: [244, 114, 182],  // pink-400
  school: [45, 212, 191],     // teal-400
  organization: [156, 163, 175], // gray-400
};

// Load an image and return it as a data URL
async function loadImageAsDataUrl(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

// Preload all icons for a routine
async function preloadIcons(activities: Activity[]): Promise<Map<string, string>> {
  const iconMap = new Map<string, string>();
  
  const loadPromises = activities.map(async (activity) => {
    // Use templateId to look up the icon
    const iconSrc = ACTIVITY_PNG_ICONS[activity.templateId];
    if (iconSrc && !iconMap.has(activity.templateId)) {
      try {
        const dataUrl = await loadImageAsDataUrl(iconSrc);
        iconMap.set(activity.templateId, dataUrl);
      } catch (error) {
        console.warn(`Failed to load icon for ${activity.templateId}:`, error);
      }
    }
  });
  
  await Promise.all(loadPromises);
  return iconMap;
}

export interface ExportOptions {
  title?: string;
  showCheckboxes?: boolean;
  showDuration?: boolean;
  columnsPerPage?: 1 | 2 | 3;
  iconSize?: "small" | "medium" | "large";
}

const ICON_SIZES = {
  small: 20,
  medium: 30,
  large: 40,
};

export async function exportRoutineToPdf(
  routine: Routine,
  options: ExportOptions = {}
): Promise<void> {
  const {
    title = routine.name,
    showCheckboxes = true,
    showDuration = true,
    columnsPerPage = 1,
    iconSize = "medium",
  } = options;

  // Create PDF (A4 size)
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  const iconSizeMm = ICON_SIZES[iconSize];
  
  // Preload all icons
  const iconMap = await preloadIcons(routine.activities);

  // Header
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text(title, pageWidth / 2, margin + 10, { align: "center" });

  // Subtitle with total duration
  const totalDuration = routine.activities.reduce((sum, a) => sum + a.duration, 0);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(128, 128, 128);
  pdf.text(
    `${routine.activities.length} activities • ${totalDuration} minutes total`,
    pageWidth / 2,
    margin + 18,
    { align: "center" }
  );
  pdf.setTextColor(0, 0, 0);

  // Calculate layout
  const columnWidth = contentWidth / columnsPerPage;
  const itemHeight = iconSizeMm + 8;
  const startY = margin + 28;

  let currentX = margin;
  let currentY = startY;
  let currentColumn = 0;

  // Draw each activity
  for (let i = 0; i < routine.activities.length; i++) {
    const activity = routine.activities[i];
    
    // Check if we need a new page
    if (currentY + itemHeight > pageHeight - margin) {
      if (currentColumn < columnsPerPage - 1) {
        // Move to next column
        currentColumn++;
        currentX = margin + columnWidth * currentColumn;
        currentY = startY;
      } else {
        // New page
        pdf.addPage();
        currentColumn = 0;
        currentX = margin;
        currentY = startY;
      }
    }

    // Background rounded rectangle
    const bgX = currentX;
    const bgY = currentY;
    const bgWidth = columnWidth - 4;
    const bgHeight = itemHeight;
    
    // Draw light background
    pdf.setFillColor(248, 250, 252);
    pdf.roundedRect(bgX, bgY, bgWidth, bgHeight, 3, 3, "F");

    let elementX = bgX + 4;

    // Checkbox
    if (showCheckboxes) {
      const checkboxSize = 6;
      const checkboxY = bgY + (bgHeight - checkboxSize) / 2;
      pdf.setDrawColor(180, 180, 180);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(elementX, checkboxY, checkboxSize, checkboxSize, 1, 1, "S");
      elementX += checkboxSize + 4;
    }

    // Category color indicator
    const categoryColor = PDF_CATEGORY_COLORS[activity.category] || [200, 200, 200];
    const indicatorSize = iconSizeMm + 4;
    const indicatorY = bgY + (bgHeight - indicatorSize) / 2;
    pdf.setFillColor(...categoryColor);
    pdf.roundedRect(elementX, indicatorY, indicatorSize, indicatorSize, 2, 2, "F");

    // Icon - use templateId to look up
    const iconDataUrl = iconMap.get(activity.templateId);
    if (iconDataUrl) {
      const iconX = elementX + 2;
      const iconY = indicatorY + 2;
      try {
        pdf.addImage(iconDataUrl, "PNG", iconX, iconY, iconSizeMm, iconSizeMm);
      } catch (error) {
        console.warn(`Failed to add icon for ${activity.templateId}:`, error);
      }
    }
    elementX += indicatorSize + 6;

    // Activity name
    const textY = bgY + bgHeight / 2;
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(30, 30, 30);
    
    // Truncate long names
    const maxTextWidth = bgWidth - (elementX - bgX) - 8;
    let displayName = activity.name;
    while (pdf.getTextWidth(displayName) > maxTextWidth && displayName.length > 3) {
      displayName = displayName.slice(0, -1);
    }
    if (displayName !== activity.name) {
      displayName += "…";
    }
    
    pdf.text(displayName, elementX, textY - (showDuration ? 1 : 0));

    // Duration
    if (showDuration) {
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(128, 128, 128);
      pdf.text(`${activity.duration} min`, elementX, textY + 4);
    }

    // Move to next item
    currentY += itemHeight + 3;
  }

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(180, 180, 180);
  pdf.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    pageWidth / 2,
    pageHeight - 8,
    { align: "center" }
  );

  // Save the PDF
  const filename = `${routine.name.toLowerCase().replace(/\s+/g, "-")}-routine.pdf`;
  
  // Check if running on native mobile platform
  if (Capacitor.isNativePlatform()) {
    // Get PDF as base64
    const pdfBase64 = pdf.output("datauristring").split(",")[1];
    
    // Save to device filesystem
    const savedFile = await Filesystem.writeFile({
      path: filename,
      data: pdfBase64,
      directory: Directory.Documents,
    });
    
    // Open share dialog so user can save/share the file
    await Share.share({
      title: `${routine.name} Routine`,
      text: "Here's your routine PDF",
      url: savedFile.uri,
      dialogTitle: "Save or Share PDF",
    });
  } else {
    // Desktop browser - use standard download
    pdf.save(filename);
  }
}
