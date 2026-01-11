# Changelog

All notable changes to Visual Routines will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2026-01-11

### Added
- Adjustable activity durations with +/- controls in routine builder
- Auto-save draft feature for routine creation (drafts persist when navigating away)
- Edit existing routines functionality (accessible from routine view page)

### Changed
- Total duration updates dynamically when adjusting individual activity times

## [1.3.0] - 2026-01-11

### Changed
- Reorganized README.md for general audience, moved technical docs to DEVELOPMENT.md

## [1.1.0] - 2026-01-10

### Added
- Centralized version management in `src/lib/version.ts`
- Automated version injection for Android and iOS builds via GitHub Actions
- Version display in Settings page About section

### Changed
- GitHub workflows now read version from single source of truth

## [1.0.0] - 2026-01-01

### Added
- Initial release of Visual Routines app
- Create and manage visual routines with activity cards
- Drag-and-drop reordering of activities
- Morning, evening, and custom routine types
- Routine templates for quick setup
- PDF export with gender-specific illustrated icons
- Recurring routines with daily auto-reset
- Multi-language support (English, Spanish, French, Norwegian, Macedonian)
- Light and dark theme support
- Accessibility options (larger text, high contrast mode)
- Data export/import functionality
- Mobile-first responsive design
- Android and iOS app builds via Capacitor
