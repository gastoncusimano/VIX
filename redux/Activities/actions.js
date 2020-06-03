const actions = {
  FILTERS_APPLY: "FILTERS_APPLY",
  FILTERS_DEFAULT: "FILTERS_DEFAULT",
  ACTIVITIES_ERROR: "ACTIVITIES_ERROR",
  HAS_FILTER_CHANGE: "HAS_FILTER_CHANGE",
  ACTIVITIES_REQUEST: "ACTIVITIES_REQUEST",
  ACTIVITIES_SUCCESS: "ACTIVITIES_SUCCESS",
  cleanFilters: () => ({ type: actions.FILTERS_DEFAULT }),
  applyFilters: (payload) => ({ type: actions.FILTERS_APPLY, payload }),
  hasFilterChange: () => ({ type: actions.HAS_FILTER_CHANGE })
}

export default actions