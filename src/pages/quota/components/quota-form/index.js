import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Switch, InputNumber, Col, Row,FormControl, Label, Select } from "tinper-bee";
import Form from 'bee-form';
import Radio from 'bee-radio';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import SearchPanel from 'components/SearchPanel';
const FormItem = Form.FormItem;
import options from "components/RefOption";
const { RangePicker } = DatePicker;
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './index.less'

class QuotaForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            coding: '',
            unit: '',
            practice: '',
            calculateRule: '',
            price: '',
            categoryname: '',
            company: '',
            category: '',
            projectName: '',
        }
    }
    componentWillMount(){
        // 获得定额列表数据
        actions.quota.getOrderTypes();
    }
    /** 查询数据
     * @param {*} error 校验是否成功
     * @param {*} values 表单数据
     */
    search = (error,values) => {
        this.props.form.validateFields(async (err, values) => {
            values.pageIndex = this.props.pageIndex || 0;
            values.pageSize = this.props.pageSize || 10;
            let {
            } = this.state;
            let price = values.price;
            if(price){
                if(Number(price)>0){
                values.price = Number(price);
                }else {
                delete values.price
                }
            }
            await actions.quota.loadList(values);
        });


    }
    /**
     * 重置
     */
    reset = () => {
        this.setState({
            coding:'',
            unit:'',
            practice:'',
            calculateRule:'',
            price:'',
            categoryname:'',
            company:'',
            category:'',
            projectName:'',
        })
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        let { orderTypes } = this.props;
        let self = this;
        let {
        } = this.state;
        return (
            <SearchPanel
                    className='quota-form'
                    form={this.props.form}
                    reset={this.reset}
                    search={this.search}>
                <Row>

                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>编码</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('coding', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>类别名称</Label>

                                    <Select
                                            {
                                            ...getFieldProps('categoryname', {
                                            initialValue: '',
                                        })
                                    }
                                    >
                                            <Option value="">请选择</Option>
                                                <Option value="1">墙、顶面涂料工程</Option>
                                                <Option value="2">贴墙砖工程</Option>
                                                <Option value="3">其他木工</Option>
                                                <Option value="4">油漆工程</Option>
                                                <Option value="5">拆除工程</Option>
                                                <Option value="6">其他项目</Option>
                                    </Select>

                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>类型</Label>

                                    <Select
                                            {
                                            ...getFieldProps('category', {
                                            initialValue: '',
                                        })
                                    }
                                    >
                                            <Option value="">请选择</Option>
                                                <Option value="1">木作</Option>
                                                <Option value="2">工程</Option>
                                    </Select>

                                </FormItem>
                            </Col>
                            <Col md={4} xs={6}>
                                <FormItem>
                                    <Label>项目名称</Label>
                                    <FormControl
                                            {
                                            ...getFieldProps('projectName', {
                                                initialValue: '',
                                            })
                                        }
                                    />


                                </FormItem>
                            </Col>
                </Row>
            </SearchPanel>
        )
    }
}

export default Form.createForm()(QuotaForm)