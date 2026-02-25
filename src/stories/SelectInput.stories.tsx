import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';
import { IoOpenOutline } from 'react-icons/io5';
import SelectInput, { SelectInputProps } from '#components/SelectInput';
import {
    Tabs,
    Tab,
    TabList,
} from '#components/Tabs';

export default {
    title: 'Input/SelectInput',
    component: SelectInput,
    argTypes: {},
};

interface Option {
    key: string;
    label: string;
    parentKey: string;
    parentLabel: string;
}

const options: Option[] = [
    { key: '1', label: 'Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple ', parentKey: '1', parentLabel: 'Red' },
    { key: '2', label: 'Banana', parentKey: '2', parentLabel: 'Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow Yellow ' },
    { key: '3', label: 'Grapes', parentKey: '3', parentLabel: 'Green' },
    { key: '4', label: 'Avocado', parentKey: '3', parentLabel: 'Green' },
    { key: '5', label: 'Pear', parentKey: '3', parentLabel: 'Green' },
];

// eslint-disable-next-line max-len
const Template: Story<SelectInputProps<string, string, Option, { containerClassName?: string }>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <SelectInput
            label="Fruit"
            {...props}
            value={value}
            options={options}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
            onChange={setValue}
        />
    );
};

export const WithPopupHeader = Template.bind({});
WithPopupHeader.args = {
    popupHeader: (
        <Tabs
            value="green"
            onChange={() => 'green'}
        >
            <TabList>
                <Tab
                    name="green"
                    style={{ flexGrow: 1 }}
                >
                    Green
                </Tab>
                <Tab
                    name="yellow"
                    style={{ flexGrow: 1 }}
                >
                    Yellow
                </Tab>
            </TabList>
        </Tabs>
    ),
};

export const WithActions = Template.bind({});
WithActions.args = {
    actionsSelector: () => (
        <a
            href="https://www.google.com/search?q=story"
            target="_blank"
            rel="noopener noreferrer"
        >
            <IoOpenOutline />
        </a>
    ),
};

export const NoValue = Template.bind({});
NoValue.args = {
    value: undefined,
};

export const Default = Template.bind({});
Default.args = {
    value: '1',
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: '1',
    disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: '1',
    readOnly: true,
};

// eslint-disable-next-line max-len
const GroupedTemplate: Story<SelectInputProps<string, string, Option, { containerClassName?: string }>> = (props) => {
    const [{ value }, updateArgs] = useArgs();

    const setValue = (e: string | undefined) => {
        updateArgs({ value: e });
    };

    return (
        <SelectInput
            label="Fruit"
            {...props}
            value={value}
            options={options}
            keySelector={(d) => d.key}
            labelSelector={(d) => d.label}
            onChange={setValue}
            grouped
            groupKeySelector={(d) => d.parentKey}
            groupLabelSelector={(d) => d.parentLabel}
        />
    );
};

export const NoValueGrouped = GroupedTemplate.bind({});
NoValueGrouped.args = {
    value: undefined,
};

export const DefaultGrouped = GroupedTemplate.bind({});
DefaultGrouped.args = {
    value: '1',
};

export const DisabledGrouped = GroupedTemplate.bind({});
DisabledGrouped.args = {
    value: '1',
    disabled: true,
};

export const ReadOnlyGrouped = GroupedTemplate.bind({});
ReadOnlyGrouped.args = {
    value: '1',
    readOnly: true,
};

export const OptionStartingWithA = GroupedTemplate.bind({});
OptionStartingWithA.args = {
    value: '2',
    hideOptionFilter: (opt: Option) => opt.label.startsWith('A'),
};
