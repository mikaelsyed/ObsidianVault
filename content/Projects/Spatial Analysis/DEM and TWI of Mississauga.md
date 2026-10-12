---
title: DEM and TWI of Mississauga
tags:
  - R
  - terrain-analysis
  - hydrology
---
A digital elevation model (DEM) and **Topographic Wetness Index (TWI)** for Mississauga, Ontario. TWI estimates where water tends to collect, from how much area drains into each cell and how steep it is:

$$\mathrm{TWI} = \ln\left(\frac{a}{\tan \beta}\right)$$

**[View the full interactive report →](https://mikaelsyed.github.io/DEM_TWI_Mississauga/)** · [Code on GitHub](https://github.com/mikaelsyed/DEM_TWI_Mississauga)

![[dem-rotation.gif]]

## Elevation

![[dem-elevation-map.png]]

## Wetness index, in R and in ArcGIS

The original version of this project calculated TWI in ArcGIS. The revised version calculates it entirely in R with `terra`: D8 flow direction and flow accumulation from the sink-filled DEM, slope, then TWI, all in a projected coordinate system so cell sizes are true ground distances.

![[dem-twi-maps.png]]

The two agree well overall (Pearson r = 0.72). Differences come mostly from how each tool routes flow across flat areas and edges.

![[dem-twi-compare.png]]

## What's in the report

- Hillshaded elevation map and summary statistics
- Perspective views and the rotating 3D view above
- Where sink filling raised the DEM, and by how much
- TWI calculated in R, compared cell by cell with the ArcGIS TWI
- Interactive map with switchable elevation and TWI layers

## Tools

R (`terra`, `ggplot2`, `patchwork`, `leaflet`, `gifski`) and ArcGIS Pro.
