import React, { Component } from 'react';
import { Select } from 'antd';
import FormGroup from './Wrapper';

const { Option } = Select;
const options = [<Option key="all">Todos</Option>];
class SelectFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'all',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isReset) {
      this.handleReset();
    }
  }

  handleReset() {
    this.setState({
      selectedOption: 'all',
    });
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption }, () => {
      this.props.callback(selectedOption);
    });
  }

  render() {
    const { selectedOption } = this.state;
    const { selectOptions, label } = this.props;
    return (
      <FormGroup label={label || 'Selecciona una Opcion'}>
        <Select
          showSearch
          size="large"
          style={{ width: '100%' }}
          value={selectedOption}
          onChange={(e) => {
            this.handleChange(e, 'name');
          }}
        >
          {selectOptions
            ? options.concat(
              selectOptions.map(item => <Option key={item.name}>{item.name}</Option>),
            )
            : []}
        </Select>
      </FormGroup>
    );
  }
}

export default SelectFilter;
