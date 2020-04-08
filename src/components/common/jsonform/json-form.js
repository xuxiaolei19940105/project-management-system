const CLASSNAME = 'className';
// UI Property
const UI_WIDGET = 'ui:widget';
const UI_OPTIONS = 'ui:options';
const UI_DISABLED = 'ui:disabled';
const UI_HIDDEN = 'ui:hidden';
const UI_FORMAT = 'ui:format';
const UI_COLSPAN = 'ui:colspan';
// 默认日期格式
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';
const DEFAULT_DATE_TIME_FORMAT = `${DEFAULT_DATE_FORMAT} HH:mm:ss`;

export default {
    name: 'elJsonForm',
    componentName: 'elJsonForm',
    props: {
        model: Object,
        labelPosition: String,
        labelWidth: String,
        labelSuffix: {
            type: String,
            default: ''
        },
        inline: Boolean,
        showMessage: {
            type: Boolean,
            default: true
        },
        // 表单提交是否重载页面
        isPrevent: {
            type: Boolean,
            default: true
        },
        schema: {
            type: Object,
            required: true
        },
        uiSchema: {
            type: Object,
            default() {
                return {};
            }
        },
        columns: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {};
    },
    computed: {
        rules() {
            const ret = {};
            const { required = [], properties = {} } = this.schema;
            // 必须输入
            required.forEach(key => {
                const item = properties[key];
                let itemName = '';
                if (item) {
                    itemName = item.title;
                }
                if (!ret[key]) {
                    ret[key] = [];
                }
                // 生成必须输入校验规则
                ret[key].push({
                    required: true,
                    message: `请输入${itemName}`,
                    trigger: 'blur'
                });
            });
            // 文本框长度限制&类型
            Object.keys(properties).forEach(key => {
                const item = properties[key];
                let itemName = '';
                if (item) {
                    itemName = item.title;
                }
                if (item.type === 'string') {
                    const rule = {
                        trigger: 'blur'
                    };
                    const minLength = item.minLength;
                    const maxLength = item.maxLength;
                    if (typeof minLength === 'number') {
                        rule.min = minLength;
                        rule.message = `长度必须大于${minLength}个字符`;
                    }
                    if (typeof maxLength === 'number') {
                        rule.max = maxLength;
                        if (typeof minLength === 'number') {
                            rule.message = `长度只能在${minLength}-${maxLength}个字符之间`;
                        } else {
                            rule.message = `长度必须小于${maxLength}个字符`;
                        }
                    }
                    if (rule.message !== '' && rule.message !== undefined) {
                        if (!ret[key]) {
                            ret[key] = [];
                        }
                        ret[key].push(rule);
                    }
                } else if (item.type === 'integer' || item.type === 'number') {
                    let message = `${itemName}必须为数字`;
                    if (item.type === 'integer') {
                        message = `${itemName}必须为整数`;
                    }
                    const numberRule = {
                        type: item.type,
                        message: message,
                        trigger: 'blur'
                    };
                    const minimum = item.minimum;
                    const maximum = item.maximum;
                    if (typeof minimum === 'number') {
                        numberRule.min = minimum;
                        numberRule.message = `请输入大于${minimum}的${item.type === 'integer' ? '整数' : '数字'}`;
                    }
                    if (typeof maximum === 'number') {
                        numberRule.max = maximum;
                        if (typeof minimum === 'number') {
                            numberRule.message = `请输入${minimum} - ${maximum}之间的${item.type === 'integer' ? '整数' : '数字'}`;
                        } else {
                            numberRule.message = `请输入小于${maximum}的${item.type === 'integer' ? '整数' : '数字'}`;
                        }
                    }
                    let isRequiredRuleExist = false;
                    if (!ret[key]) {
                        ret[key] = [];
                    } else {
                        isRequiredRuleExist = ret[key].some(newRule => {
                            // 因async-validator无法正常处理数字类型的required:true规则，
                            // 因此暂时移除数字类型的required:true规则
                            if (newRule.required === true) {
                                newRule.type = item.type;
                                return true;
                            }
                        });
                    }
                    if (isRequiredRuleExist) {
                        // 在规则头部生成数字校验规则以规避上述问题
                        ret[key].unshift(numberRule);
                    } else {
                        // 在规则末尾生成数字校验规则
                        ret[key].push(numberRule);
                    }
                }
            });
            return ret;
        }
    },
    created() {},
    methods: {
        onSubmit() {
            this.$emit('submit', this.model);
        },
        validate(callback) {
            this.$refs.form.validate(callback);
        },
        validateField(props, cb) {
            this.$refs.form.validateField(props, cb);
        },
        resetFields() {
            this.$refs.form.resetFields();
        }
    },
    render(h) {
        const self = this;
        const formItemArray = [];
        const formEvents = {
            on: {}
        };
        formEvents.on.submit = () => {
            this.onSubmit();
        };
        if (this.schema && this.schema.properties) {
            Object.keys(this.schema.properties).forEach(key => {
                const ui = this.uiSchema[key] || {};
                const className = ui[CLASSNAME] || '';
                let componentTagName = '';
                let componentProps = {
                    class: `el-json-form__component ${className}`
                };
                const componentChildren = [];
                const props = {
                    value: self.model[key],
                    disabled: ui[UI_DISABLED] === true
                };
                const property = self.schema.properties[key];
                const events = {
                    on: {}
                };
                // 因render 函数中没有与 v-model 相应的 api, 实现v-model逻辑。
                events.on.input = val => {
                    this.model[key] = val;
                    this.$emit('change', key, val, self.model);
                };
                if (property.enum || property.oneOf || property.anyOf) {
                    if (property.oneOf && ui[UI_WIDGET] === 'radio') {
                        componentTagName = 'el-radio-group';
                    } else if (property.anyOf && ui[UI_WIDGET] === 'checkbox' && property.type === 'array') {
                        componentTagName = 'el-checkbox-group';
                    } else {
                        componentTagName = 'el-select';
                        props.multiple = false;
                    }
                    // 取得选择项一览
                    let list = null;
                    if (property.oneOf) {
                        list = property.oneOf;
                    } else if (property.anyOf) {
                        list = property.anyOf;
                        if (componentTagName === 'el-select') {
                            props.multiple = true;
                        }
                    } else {
                        list = property.enum.map(e => {
                            return { title: e, const: e };
                        });
                    }
                    const optionList = [];
                    list.forEach(item => {
                        optionList.push({
                            label: item.title,
                            value: item.const
                        });
                    });
                    if (componentTagName === 'el-select') {
                        optionList.forEach(item => {
                            componentChildren.push(
                                h('el-option', {
                                    props: {
                                        label: item.label,
                                        value: item.value
                                    }
                                })
                            );
                        });
                    } else if (componentTagName === 'el-radio-group') {
                        optionList.forEach(item => {
                            componentChildren.push(
                                h(
                                    'el-radio',
                                    {
                                        props: {
                                            label: item.value
                                        }
                                    },
                                    [item.label]
                                )
                            );
                        });
                    } else if (componentTagName === 'el-checkbox-group') {
                        optionList.forEach(item => {
                            componentChildren.push(
                                h(
                                    'el-checkbox',
                                    {
                                        props: {
                                            label: item.value
                                        }
                                    },
                                    [item.label]
                                )
                            );
                        });
                    }
                } else if (property.format === 'date' || property.format === 'date-time') {
                    componentTagName = 'el-date-picker';
                    events.on.input = val => {
                        this.model[key] = val;
                    };
                    events.on.change = val => {
                        this.model[key] = val;
                        this.$emit('change', key, val, self.model);
                    };
                    if (property.type === 'string') {
                        props.type = property.format.replace(/-/g, '');
                    } else if (property.type === 'array') {
                        props.type = `${property.format}-range`.replace(/-/g, '');
                    }
                    if (ui[UI_FORMAT] !== undefined && ui[UI_FORMAT] !== null) {
                        props['value-format'] = ui[UI_FORMAT];
                    } else if (property.format === 'date' || property.format === 'date-range') {
                        props['value-format'] = DEFAULT_DATE_FORMAT;
                    } else if (property.format === 'date-time' || property.format === 'date-time-range') {
                        props['value-format'] = DEFAULT_DATE_TIME_FORMAT;
                    }
                } else if (property.type === 'string') {
                    componentTagName = 'el-input';
                    // 组件类型
                    const widgetType = ui[UI_WIDGET];
                    if (widgetType !== undefined) {
                        if (widgetType === 'password') {
                            props.type = 'password';
                        } else if (widgetType === 'textarea') {
                            props.type = 'textarea';
                            const options = ui[UI_OPTIONS] || {};
                            if (typeof options.rows === 'number') {
                                const attrs = componentProps.attrs || {};
                                attrs.rows = options.rows;
                                componentProps.attrs = attrs;
                            }
                        }
                    }
                    componentProps.style = {
                        width: '100%'
                    };
                } else if (property.type === 'integer' || property.type === 'number') {
                    events.on.input = val => {
                        let ret = val;
                        ret = parseFloat(val);
                        if (isNaN(ret)) {
                            ret = '';
                        }
                        this.model[key] = ret;
                        this.$emit('change', key, ret, self.model);
                    };
                    componentTagName = 'el-input';
                }
                componentProps.props = props;
                componentProps.on = events.on;
                // 合并ui:options属性至组件属性中
                // 用户自定义的options属性为最优先
                const mergedProps = Object.assign({}, componentProps.props, ui[UI_OPTIONS] || {});
                componentProps.props = mergedProps;
                const formItem = h(
                    'el-form-item',
                    {
                        class: [`el-form-item-${key}`, 'el-json-form-item', ui[UI_HIDDEN] === true ? 'is-hidden' : ''],
                        props: {
                            label: property.title,
                            prop: key
                        }
                    },
                    [h(componentTagName, componentProps, componentChildren)]
                );
                formItemArray.push({
                    id: key,
                    component: formItem
                });
            });
        }
        const formProps = {
            model: self.model,
            rules: self.rules,
            labelPosition: self.labelPosition || 'top',
            labelWidth: self.labelWidth,
            labelSuffix: self.labelSuffix,
            inline: self.inline,
            showMessage: self.showMessage,
            isPrevent: self.isPrevent
        };
        let formComponents = formItemArray;
        // inline模式的场合不使用自适应
        if (this.inline !== true) {
            // 自适应设置
            const rowArray = [];
            let colArray = [];
            let totalSpanCount = 0;
            for (let index = 0; index < formItemArray.length; index += 1) {
                const formItem = formItemArray[index];
                const itemUISchema = this.uiSchema[formItem.id] || {};
                let uiColspan = itemUISchema[UI_COLSPAN];
                uiColspan = uiColspan > self.columns ? self.columns : uiColspan;
                let spanProp = null;
                const span = typeof uiColspan === 'number' ? (24 / self.columns) * uiColspan : 24 / self.columns;
                // 基于JavaScript浮点数运算精度问题，此处进行特殊处理，只考虑columns属性为5的场合
                if (self.columns === 5) {
                    switch (uiColspan) {
                        case 1:
                            spanProp = '4-8';
                            break;
                        case 2:
                            spanProp = '9-6';
                            break;
                        case 3:
                            spanProp = '14-4';
                            break;
                        case 4:
                            spanProp = '19-2';
                            break;
                        case 5:
                            spanProp = '24';
                            break;
                        default:
                            spanProp = '4-8';
                    }
                } else {
                    spanProp = span;
                }
                let column = h(
                    'el-col',
                    {
                        props: {
                            span: spanProp,
                            xs: 24
                        }
                    },
                    [formItem.component]
                );
                totalSpanCount += span;
                if (totalSpanCount <= 24) {
                    colArray.push(column);
                }
                // 已超过最大栅格数的场合，暂不处理当前元素
                if (totalSpanCount > 24) {
                    index -= 1;
                }
                if (totalSpanCount >= 24 || index === formItemArray.length - 1) {
                    const gutter = self.labelWidth === undefined || self.labelWidth === null ? 10 : 20;
                    const row = h(
                        'el-row',
                        {
                            props: {
                                gutter: gutter
                            }
                        },
                        [...colArray]
                    );
                    rowArray.push(row);
                    colArray = [];
                    totalSpanCount = 0;
                }
            }
            formComponents = rowArray;
        } else {
            formComponents = formItemArray.map(item => item.component);
        }
        return h(
            'el-form',
            {
                class: 'el-json-form',
                props: formProps,
                on: formEvents.on,
                ref: 'form'
            },
            [...formComponents, self.$slots.button]
        );
    }
};
