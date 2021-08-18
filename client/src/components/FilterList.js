import React from 'react';
import FilterButton from './FilterButton';

const FilterList = (props) => {
    const FILTER_NAMES = Object.keys(props.FILTER_MAP);
        return (FILTER_NAMES.map(name => (
            <FilterButton
            key={name}
            name={name}
            isPressed={name === props.filter}
            setFilter={props.setFilter}
          /> 
        )
    ))
}

export default FilterList;