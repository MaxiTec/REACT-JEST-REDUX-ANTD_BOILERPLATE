import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Axios from 'axios';
import {
  Row, Col, Input, Button,
} from 'antd';
import FormGroup from '../../components/WrapInputs/Wrapper';
import AppContext from '../../components/AppContext';
import Table from '../../components/Table';
import SelectFilter from '../../components/WrapInputs/SelectFilter';

class ListaTour extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      tours: [],
      filtered: [],
      search: '',
    };
    this.onFilteredChangeCustom = this.onFilteredChangeCustom.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  componentDidMount() {
    this.context.changeTitle('Listado de Tours');
    this.context.setRouteBtn('/tours/agregar');
    Axios.get('https://5cec507b77d47900143b930b.mockapi.io/vcm/tours').then((tours) => {
      this.setState({
        loading: false,
        tours: tours.data,
      });
    });
    // http(s)://5cec507b77d47900143b930b.mockapi.io/vcm/:endpoint
  }

  onFilteredChangeCustom(value, accessor) {
    const { filtered } = this.state;
    let insertNewFilter = 1;
    if (filtered.length) {
      filtered.forEach((filter, i) => {
        if (filter.id === accessor) {
          //   if (value === "" || !value.length) {
          //       filtered.splice(i, 1);
          //     }
          filter.value = value;
          insertNewFilter = 0;
        }
      });
    }
    if (insertNewFilter) {
      filtered.push({ id: accessor, value });
    }
    this.setState({ filtered });
  }

  resetFilters() {
    this.setState({
      filtered: [],
      search: '',
    });
  }

  render() {
    const { loading, tours, filtered } = this.state;
    return (
      <Table
        data={tours}
        loading={loading}
        filtered={filtered}
        columns={[
          {
            Header: 'Código',
            id: 'codigo',
            className: 'rt-td--left',
            accessor: d => (
              <div>
                <strong>{d.id}</strong>
              </div>
            ),
            width: 80,
          },
          {
            Header: 'Excursión',
            id: 'name',
            filterAll: true,
            accessor: 'name',
            filterMethod: (filter, rows) => {
              let filtro;
              if (filter.value.length > 0) {
                filtro = rows.filter((ele) => {
                  const { name } = ele;
                  return name.toLowerCase().includes(filter.value.toLowerCase());
                });
                return filtro;
              }
              return rows;
            },
            maxWidth: 250,
          },
          {
            Header: 'Categoría',
            id: 'categoria',
            filterAll: true,
            accessor: 'categoria',
            filterMethod: (filter, rows) => {
              if (filter.value == 'all') {
                return rows;
              }
              const filtro = rows.filter((ele) => {
                const { categoria } = ele;
                return categoria === filter.value;
              });
              return filtro;
            },
            maxWidth: 250,
          },
          {
            Header: 'Proveedor',
            id: 'proveedor',
            filterAll: true,
            accessor: 'proveedor',
            filterMethod: (filter, rows) => {
              if (filter.value == 'all') {
                return rows;
              }
              const filtro = rows.filter((ele) => {
                const { proveedor } = ele;
                return proveedor === filter.value;
              });
              return filtro;
            },
            maxWidth: 250,
          },
          {
            Header: (
              <div>
                Código
                <br />
                Proveedor
              </div>
            ),
            id: 'codigo_proveedor',
            accessor: 'codigo_proveedor',
            width: 100,
          },
          {
            Header: 'Ubicación',
            id: 'ubicacion',
            accessor: 'ubicacion',
            filterAll: true,
            filterMethod: (filter, rows) => {
              if (filter.value == 'all') {
                return rows;
              }
              const filtro = rows.filter((ele) => {
                const { ubicacion } = ele;
                return ubicacion === filter.value;
              });
              return filtro;
            },
            minWidth: 200,
            maxWidth: 250,
          },
          {
            Header: (
              <div>
                Fecha de
                <br />
                Actualización
              </div>
            ),
            id: 'createdAt',
            accessor: 'createdAt',
            Cell: row => <span>{moment(row).format('LL')}</span>,
            minWidth: 200,
          },
          {
            Header: 'Opciones',
            fixed: 'left',
            accessor: 'opciones',
            Cell: row => <Button type="link">{row.value ? 'Activar' : 'Desactivar'}</Button>,
            sortable: false,
            width: 100,
          },
          {
            accessor: 'id',
            fixed: 'right',
            Cell: row => (
              <Button size="small" type="primary">
                <span className="icon icon-plus" />
                <Link style={{color:'white'}} to={`/tours/editar/${row.value}`}>Editar</Link>
              </Button>
            ),
            sortable: false,
            width: 100,
          },
        ]}
      >
        <Row type="flex" gutter={16} align="bottom">
          <Col xs={24} lg={5}>
            <FormGroup label="Nombre">
              <Input
                size="large"
                allowClear
                value={this.state.search}
                onChange={(e) => {
                  const { value } = e.target;
                  this.setState({
                    search: value,
                  });
                  this.onFilteredChangeCustom(value, 'name');
                }}
              />
            </FormGroup>
          </Col>
          <Col xs={24} lg={5}>
            <SelectFilter
              isReset={filtered.length == 0}
              callback={(value) => {
                this.onFilteredChangeCustom(value, 'categoria');
              }}
              selectOptions={[{ name: 'invoice' }, { name: 'payment' }, { name: 'withdrawal' }]}
              label="Categoría"
            />
          </Col>
          <Col xs={24} lg={5}>
            <SelectFilter
              isReset={filtered.length == 0}
              callback={(value) => {
                this.onFilteredChangeCustom(value, 'proveedor');
              }}
              selectOptions={[
                { name: 'Marina Albatros' },
                { name: 'Otros' },
                { name: 'Otros Mas' },
              ]}
              label="Proveedor"
            />
          </Col>
          <Col xs={24} lg={5}>
            <SelectFilter
              isReset={filtered.length == 0}
              callback={(value) => {
                this.onFilteredChangeCustom(value, 'ubicacion');
              }}
              selectOptions={[{ name: 'Isla Mujeres' }, { name: 'Cancún' }, { name: 'Cozumel' }]}
              label="Ubicación"
            />
          </Col>
          <Col xs={24} lg={4}>
            <button
              onClick={this.resetFilters}
              style={{ width: '100%', marginBottom: '20px' }}
              className="ant-btn ant-btn-primary ant-btn-lg"
            >
              Reset Filters
            </button>
          </Col>
        </Row>
      </Table>
    );
  }
}

ListaTour.contextType = AppContext;
export default ListaTour;
