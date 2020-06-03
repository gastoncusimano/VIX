import actions from './actions'

const initialState = {
  data: [{
    id: 11,
    date: "28.03.2020",
    value: 32767.00,
    title: "Rapipago",
    status: "more", 
    description: "Carga de dinero",
  },{ 
    id: 113,
    date: "26.03.2020",
    value: 750.80,
    status: "less",
    title: "Ajuste de Saldo",
    description: "Cobro impuesto País 8%",
  },{
    id: 1234,
    date: "28.03.2020",
    value: 32767.00,
    title: "Rapipago",
    status: "more", 
    description: "Carga de dinero",
  },{ 
    id: 125,
    date: "26.03.2020",
    value: 750.80,
    status: "less",
    title: "Ajuste de Saldo",
    description: "Cobro impuesto País 8%",
  },{
    id: 1,
    date: "2021-02-11",
    value: "889.00",
    title: "Smith LLC",
    status: "more",
    description: "Maiores error non iusto ad."
  },{
    id: 2,
    date: "2020-06-04",
    value: "313.00",
    title: "Franecki Group",
    status: "more",
    description: "Nihil et possimus"
  },{
    id: 3,
    date: "2020-06-27",
    value: "903.00",
    title: "Crist, Feil",
    status: "more",
    description: "Nisi et es"
  },{
    id: 4,
    date: "2020-11-21",
    value: "705.00",
    title: "Beahan, Morissette and Hand",
    status: "more",
    description: "Autem accusamus nobis."
  },{
    id: 5,
    date: "2020-11-02",
    value: "523.00",
    title: "McClure",
    status: "more",
    description: "Id non non eaque qui."
  },{
    id: 6,
    date: "2020-09-08",
    value: "502.00",
    title: "Wilderman Inc",
    status: "more",
    description: "Cumque inidnt eligendi pariatur."
  },{
    id: 7,
    date: "2020-10-03",
    value: "34.00",
    title: "Robel and Sons",
    status: "more",
    description: "Maiores voluptatem"
  },{
    id: 8,
    date: "2021-01-29",
    value: "394.00",
    title: "Johns, Runolfsdottir and Gibson",
    status: "more",
    description: "Consequatur dicta"
  }],
  error: null,
  filters: {
    periodo: { id: 6, name: "Último Año" },
    estados: { id: 1, name: "Todos los estados" },
    operaciones: { id: 1, name: "Todas las operaciones" },
  },
  fetched: false,
  fetching: false,
  hasFilters: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case actions.ACTIVITIES_REQUEST:
    return { ...state, fetching: true }
  case actions.ACTIVITIES_SUCCESS:
    return { ...state, fetched: true, data: payload }
  case actions.ACTIVITIES_ERROR:
    return { ...state, fetching: false, error: payload }
  case actions.FILTERS_APPLY:
    return { ...state, filters: payload, fetched: false, hasFilters: true }
  case actions.FILTERS_DEFAULT:
    return { ...state, filters: initialState.filters, fetched: false, hasFilters: false }
  case actions.HAS_FILTER_CHANGE:
    return { ...state, hasFilters: false }
  default:
    return state
  }
}