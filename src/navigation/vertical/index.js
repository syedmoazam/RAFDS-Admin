// ** Navigation sections imports
import apps from "./apps"
import pages from "./pages"
import forms from "./forms"
import tables from "./tables"
import others from "./others"
import dashboards from "./dashboards"
import items from "./items"
import uiElements from "./ui-elements"
import chartsAndMaps from "./charts-maps"
import inventory from "./inventory"
import branch from "./branch"
import _package from "./package"

// ** Merge & Export
export default [
  ...dashboards,
  ...items,
  ..._package,
  ...inventory,
  ...branch
//   ...apps,
//   ...pages,
//   ...uiElements,
//   ...forms,
//   ...tables,
//   ...chartsAndMaps,
//   ...others
]
