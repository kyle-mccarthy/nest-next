# Changes

## [0.7.0] - 2019-04-24

### Changed
- Renamed RegisterOptions interface to RendererConfig and moved to the types file.
  
### Added
- Added dev option to new RendererConfig along with getters and setters to the RenderService.

### Fixed
- Transformed the error from nest to the interface next expects. Previously server side errors passed to the frontend resulted in an invariant violation in React.
