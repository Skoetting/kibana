/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { shallowWithIntl, mountWithIntl } from 'test_utils/enzyme_helpers';
import { FilterPopoverProps, FilterPopover } from '../filter_popover';
import { UptimeFilterButton } from '../uptime_filter_button';
import { EuiFilterSelectItem } from '@elastic/eui';

describe('FilterPopover component', () => {
  let props: FilterPopoverProps;

  beforeEach(() => {
    props = {
      fieldName: 'foo',
      id: 'test',
      loading: false,
      items: ['first', 'second', 'third', 'fourth'],
      onFilterFieldChange: jest.fn(),
      selectedItems: ['first', 'third'],
      title: 'bar',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors for valid props', () => {
    const wrapper = shallowWithIntl(<FilterPopover {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('expands on button click', () => {
    const wrapper = mountWithIntl(<FilterPopover {...props} />);

    // ensure the popover isn't open
    expect(wrapper.find('EuiPopoverTitle')).toHaveLength(0);

    expect(wrapper.find(UptimeFilterButton)).toHaveLength(1);
    wrapper.find(UptimeFilterButton).simulate('click');

    // check that the popover is now open
    expect(wrapper.find('EuiPopoverTitle')).toHaveLength(1);
  });

  it('does not show item list when loading', () => {
    props.loading = true;
    const wrapper = shallowWithIntl(<FilterPopover {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('returns selected items on popover close', () => {
    const wrapper = mountWithIntl(
      <div>
        <div id="foo">Some text</div>
        <FilterPopover {...props} />
      </div>
    );
    expect(wrapper.find(UptimeFilterButton)).toHaveLength(1);
    wrapper.find(UptimeFilterButton).simulate('click');
    expect(wrapper.find(EuiFilterSelectItem)).toHaveLength(props.items.length);
    wrapper.find(EuiFilterSelectItem).at(1).simulate('click');
    wrapper.find('#foo').simulate('click');
    const rendered = wrapper.render();
    expect(rendered).toMatchSnapshot();
  });
});
