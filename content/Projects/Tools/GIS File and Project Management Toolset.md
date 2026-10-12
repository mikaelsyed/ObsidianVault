---
title: GIS File and Project Management Toolset
tags:
  - Python
  - arcpy
  - automation
---
A **Python desktop app** that bundles the file and project chores that come up constantly in GIS work into one window: copying, replacing, renaming and mapping out project folders, and building ArcGIS Pro projects in bulk.

[Code on GitHub](https://github.com/mikaelsyed/GIS_File_Project_Management_Toolset)

## The tools

- **Clone**: copies a file or folder to a chosen destination
- **Delete**: permanently deletes a file or folder, with progress reporting
- **Replace**: deletes a target and puts a replacement file or folder in its place
- **Replace + Backup**: backs up the target first, and only replaces it if the backup finishes without errors
- **Bulk Rename**: recursively renames files and folders, swapping one piece of text for another wherever it appears in a name
- **Folder Visualizer**: scans a folder and writes a self-contained HTML tree diagram, with small text-file previews built in
- **ArcGIS Project Builder**: creates one or many ArcGIS Pro projects (`.aprx`), each in its own folder with a dedicated file geodatabase

## Design notes

- Each tool is a panel in a sidebar, so new tools can be added by registering one class
- Long operations run with progress reporting, so the window never freezes
- Errors are always visible: they are logged to a file and shown in a message box, even when the app runs without a console
- `run.bat` finds a working Python 3.8+ (including Miniconda or Anaconda installs) and launches the app
- The ArcGIS Project Builder needs `arcpy`, so it checks for ArcGIS Pro's Python instead of failing silently

## Built with

Python, Tkinter, and `arcpy` for the ArcGIS Pro tools.
