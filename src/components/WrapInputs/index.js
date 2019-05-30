import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;
class SelectFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
    console.log(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.isReset) {
      this.handleReset();
    }
  }

  handleReset() {
    this.setState({
      selectedOption: null,
    });
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption }, () => {
      this.props.callback(selectedOption);
    });
  }

  render() {
    const { selectedOption } = this.state;
    const { options, label } = this.props;
    return (
      <div className="form-group no-margin no-padding">
        <label className="form__label form__label--nowrap required">{label}</label>
        <Select
          className="form-select"
          classNamePrefix="form-select"
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          placeholder="Escoja una Opción"
        />
      </div>
    );
  }
}

export default SelectComponent;
