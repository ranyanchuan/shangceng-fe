import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {actions} from "mirrorx";
import queryString from 'query-string';
import {
    Switch,
    InputNumber,
    Loading,
    Table,
    Button,
    Col,
    Row,
    Icon,
    InputGroup,
    FormControl,
    Checkbox,
    Modal,
    Panel,
    PanelGroup,
    Label,
    Message
} from "tinper-bee";
import Radio from 'bee-radio';
import {BpmTaskApprovalWrap} from 'yyuap-bpm';
import Header from "components/Header";
import options from "components/RefOption";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
import Select from 'bee-select';
import RefWithInput from 'yyuap-ref/dist2/refWithInput'
import moment from "moment";
import 'yyuap-ref/dist2/yyuap-ref.css'//参照样式
import './edit.less';
import 'ac-upload/build/ac-upload.css';
import {setCookie, getCookie} from "utils";

const FormItem = Form.FormItem;
const Option = Select.Option;
const format = "YYYY-MM-DD HH:mm:ss";

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: {},
            fileNameData: props.rowData.attachment || [],//上传附件数据
        }
    }

    async componentWillMount() {
        await actions.quota.getOrderTypes();
        let searchObj = queryString.parse(this.props.location.search);
        let {btnFlag} = searchObj;
        if (btnFlag && btnFlag > 0) {
            let {search_id} = searchObj;
            let tempRowData = await actions.quota.queryDetail({search_id});
            let rowData = this.handleRefShow(tempRowData) || {};

            console.log('rowData', rowData);
            this.setState({
                rowData: rowData,
            })
        }

    }

    save = () => {//保存
        this.props.form.validateFields(async (err, values) => {
            values.attachment = this.state.fileNameData;
            let numArray = [
                "price",
            ];
            for (let i = 0, len = numArray.length; i < len; i++) {
                values[numArray[i]] = Number(values[numArray[i]]);
            }


            if (err) {
                Message.create({content: '数据填写错误', color: 'danger'});
            } else {
                let {
                    rowData,
                } = this.state;

                let saveObj = Object.assign({}, rowData, values);

                await actions.quota.save(
                    saveObj,
                );
            }
        });
    }

    // 处理参照回显
    handleRefShow = (tempRowData) => {
        let rowData = {};
        if (tempRowData) {

            let {} = tempRowData;

            this.setState({})
            rowData = Object.assign({}, tempRowData,
                {}
            )
        }
        return rowData;
    }

    onBack = async () => {
        window.history.go(-1);
    }

    // 动态显示标题
    onChangeHead = (btnFlag) => {
        let titleArr = ["新增", "编辑", "详情"];
        return titleArr[btnFlag] || '新增';
    }

    // 跳转到流程图
    onClickToBPM = (rowData) => {
        console.log("actions", actions);
        actions.routing.push({
            pathname: 'quota-chart',
            search: `?id=${rowData.id}`
        })
    }

    // 流程图相关回调函数
    onBpmStart = () => {
        actions.quota.updateState({showLoading: true});
    }
    onBpmEnd = () => {
        actions.quota.updateState({showLoading: false});
    }
    onBpmSuccess = () => {
        window.setTimeout(() => {
            actions.quota.updateState({showLoading: false});
            // actions.routing.push('pagination-table');
            actions.routing.goBack();
        }, 1000);
    }
    onBpmError = () => {
        actions.quota.updateState({showLoading: false});
    }

    // 审批面板展示
    showBpmComponent = (btnFlag, appType, id, processDefinitionId, processInstanceId, rowData) => {
        // btnFlag为2表示为详情
        if ((btnFlag == 2) && rowData && rowData['id']) {
            console.log("showBpmComponent", btnFlag)
            return (
                <div>
                    {appType == 1 && <BpmTaskApprovalWrap
                        id={rowData.id}
                        onBpmFlowClick={() => {
                            this.onClickToBPM(rowData)
                        }}
                        appType={appType}
                        onStart={this.onBpmStart}
                        onEnd={this.onBpmEnd}
                        onSuccess={this.onBpmSuccess}
                        onError={this.onBpmError}
                    />}
                    {appType == 2 && <BpmTaskApprovalWrap
                        id={id}
                        processDefinitionId={processDefinitionId}
                        processInstanceId={processInstanceId}
                        onBpmFlowClick={() => {
                            this.onClickToBPM(rowData)
                        }}
                        appType={appType}
                        onStart={this.onBpmStart}
                        onEnd={this.onBpmEnd}
                        onSuccess={this.onBpmSuccess}
                        onError={this.onBpmError}
                    />}
                </div>

            );
        }
    }

    arryDeepClone = (array) => {
        let result = [];
        if (array) {
            array.map((item) => {
                let temp = Object.assign([], item);
                result.push(temp);
            })
        }
    }

    // 通过search_id查询数据

    render() {
        const self = this;

        let {btnFlag, appType, id, processDefinitionId, processInstanceId} = queryString.parse(this.props.location.search);
        btnFlag = Number(btnFlag);
        let {
            rowData,
        } = this.state;


        let title = this.onChangeHead(btnFlag);
        let {coding, unit, practice, calculateRule, price, categoryname, company, category, projectName,} = rowData;
        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div className='quota-detail'>
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={this.props.showLoading}
                />
                <Header title={title} back={true} backFn={this.onBack}>
                    {(btnFlag < 2) ? (
                        <div className='head-btn'>
                            <Button className='head-cancel' onClick={this.onBack}>取消</Button>
                            <Button className='head-save' onClick={this.save}>保存</Button>
                        </div>
                    ) : ''}
                </Header>
                {
                    self.showBpmComponent(btnFlag, appType ? appType : "1", id, processDefinitionId, processInstanceId, rowData)
                }
                <Row className='detail-body'>

                    {/*<Col md={4} xs={6}>*/}
                        {/*<Label>编码：</Label>*/}
                        {/*<FormControl disabled={true}*/}
                                     {/*{...getFieldProps('coding', {*/}
                                         {/*validateTrigger: 'onBlur',*/}
                                         {/*initialValue: coding || '',*/}
                                         {/*rules: [{*/}
                                             {/*type: 'string', required: false, pattern: /\S+/ig, message: '请输入编码',*/}
                                         {/*}],*/}
                                     {/*})}*/}
                        {/*/>*/}
                        {/*<span className='error'>{getFieldError('coding')}</span>*/}
                    {/*</Col>*/}
                    <Col md={4} xs={6}>
                        <Label>单位：</Label>
                        <Select disabled={btnFlag == 2}
                                {...getFieldProps('unit', {
                                        initialValue: unit ? Number(unit) : '',
                                        rules: [{
                                            required: true, message: '请选择单位',
                                        }],
                                    }
                                )}
                        >
                            <Option value="">请选择</Option>
                            <Option value={1}>m</Option>
                            <Option value={2}>m2</Option>
                            <Option value={3}>步</Option>
                            <Option value={4}>车</Option>
                            <Option value={5}>个</Option>
                            <Option value={6}>樘</Option>
                            <Option value={7}>套</Option>
                            <Option value={8}>项</Option>
                            <Option value={9}>元</Option>
                        </Select>


                        <span className='error'>{getFieldError('unit')}</span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>单价：</Label>
                        <InputNumber
                            precision={2}
                            min={0}
                            className={"input-number"}
                            disabled={btnFlag == 2}
                            {
                                ...getFieldProps('price', {
                                    initialValue: typeof price !== 'undefined' && Number(price).toFixed(2) || 0.00,
                                })
                            }
                        />
                        <span className='error'>{getFieldError('price')}</span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>类别名称：</Label>
                        <Select disabled={btnFlag == 2}
                                {
                                    ...getFieldProps('categoryname', {
                                            initialValue: categoryname ? Number(categoryname) : "",
                                            rules: [{
                                                required: true, message: '请选择类别名称',
                                            }],
                                        }
                                    )}>
                            <Option value="">请选择</Option>
                            <Option value={1}>墙、顶面涂料工程</Option>
                            <Option value={2}>贴墙砖工程</Option>
                            <Option value={3}>其他木工</Option>
                            <Option value={4}>油漆工程</Option>
                            <Option value={5}>拆除工程</Option>
                            <Option value={6}>其他项目</Option>
                        </Select>
                        <span className='error'>{getFieldError('categoryname')}</span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>所属公司：</Label>
                        <FormControl disabled={btnFlag == 2 || false}
                                     {
                                         ...getFieldProps('company', {
                                                 validateTrigger: 'onBlur',
                                                 initialValue: company || '',
                                                 rules: [{
                                                     type: 'string', required: false, pattern: /\S+/ig, message: '请输入所属公司',
                                                 }],
                                             }
                                         )}
                        />
                        <span className='error'>{getFieldError('company')}</span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>类型：</Label>
                        <Select disabled={btnFlag == 2}
                                {
                                    ...getFieldProps('category', {
                                            initialValue: category ? Number(category) : "",
                                            rules: [{
                                                required: true, message: '请选择类型',
                                            }],
                                        }
                                    )}>
                            <Option value="">请选择</Option>
                            <Option value={1}>木作</Option>
                            <Option value={2}>工程</Option>
                        </Select>
                        <span className='error'>{getFieldError('category')}</span>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>项目名称：</Label>
                        <FormControl disabled={btnFlag == 2 || false}
                                     {
                                         ...getFieldProps('projectName', {
                                                 validateTrigger: 'onBlur',
                                                 initialValue: projectName || '',
                                                 rules: [{
                                                     type: 'string', required: true, pattern: /\S+/ig, message: '请输入项目名称',
                                                 }],
                                             }
                                         )}
                        />
                        <span className='error'>{getFieldError('projectName')}</span>
                    </Col>
                    <Col md={12} xs={12}>
                        <Label>工艺做法：</Label>
                        <FormControl disabled={btnFlag == 2 || false} componentClass='textarea' className="quote-textarea"
                                     {...getFieldProps('practice', {
                                             validateTrigger: 'onBlur',
                                             initialValue: practice || '',
                                             rules: [{
                                                 type: 'string', required: true, pattern: /\S+/ig, message: '请输入工艺做法',
                                             }],
                                         }
                                     )}
                        />
                        <span className='error'>{getFieldError('practice')}</span>
                    </Col>

                    <Col md={12} xs={12}>
                        <Label>计算规则：</Label>
                        <FormControl disabled={btnFlag == 2 || false} componentClass='textarea' className="quote-textarea"
                                     {...getFieldProps('calculateRule', {
                                             validateTrigger: 'onBlur',
                                             initialValue: calculateRule || '',
                                             rules: [{
                                                 type: 'string', required: true, pattern: /\S+/ig, message: '请输入计算规则',
                                             }],
                                         }
                                     )}
                        />
                        <span className='error'>{getFieldError('calculateRule')}</span>
                    </Col>
                </Row>
                <div style={{clear:'both'}}></div>
            </div>
        )
    }
}

export default Form.createForm()(Edit);
