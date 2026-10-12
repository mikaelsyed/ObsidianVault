---
title: Polyline QC Toolset
tags:
  - CSharp
  - ArcGIS-Pro-SDK
  - quality-control
---
An **ArcGIS Pro add-in** written in C# that adds a "PolylineQC" tab to the ribbon: a set of quality-control and editing tools for polyline datasets. They are standard topology and data checks that work on any polyline data, with nothing project-specific built in.

[Code on GitHub](https://github.com/mikaelsyed/MikaelsPolylineToolset)

## The tools

**Batch QC**
- **Run Polyline QC Checks**: runs the full set of checks in one pass

**Polyline QC**
- **Isolated Polylines**: lines that don't connect to anything
- **Crossing Polylines**: lines that cross without a shared vertex
- **Overlapping Polylines**: lines that lie on top of each other
- **Invalid Junctions** and **N-Valence Junctions**: junctions with the wrong number of connecting lines
- **Converging Ends**: line ends that meet where they shouldn't
- **Edge-Touching Polylines**: lines that touch only at an edge
- **Unconnected Ends**: flags line ends that stop short of a connection
- **Vertex Count Check**: vertex counts checked against an attribute

**Polyline Editing**
- **Recondition Vertices**: cleans up and regularizes polyline vertices

**Boundary QC**
- **Intersect Points**: points where polylines cross a boundary
- **Boundary validation**: checks how lines enter and leave a boundary

**Raster QC**
- **Raster % Overlap**: how much of a raster each feature covers

**Metadata**
- **Metadata Editor**, **Viewer** and **Export**

Each check selects or flags the problem features so they can be reviewed and fixed directly in the map, and results can be written out to a file geodatabase.

## Built with

C#, the ArcGIS Pro SDK for .NET, and WPF for the tool windows.
