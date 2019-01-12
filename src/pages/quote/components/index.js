import React, {Component} from "react";
import {actions} from "mirrorx";
import {Icon, Loading, Row, Col,  FormControl, Modal} from "tinper-bee";
import RefMultipleTableWithInput from "ref-multiple-table";
import Button from 'components/Button';

import QuoteTable from "./Quote";
import Subject from "./Subject";
import Part from "./Part";

import Grid from "components/Grid";
import {Warning} from "utils";

import "bee-complex-grid/build/Grid.css";
import "bee-pagination/build/Pagination.css";
import "bee-table/build/Table.css";

import "ref-multiple-table/dist/index.css";
import "./index.less";

class Quote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            selectData: []
        };
    }

    componentDidMount() {
        // actions.query.loadList(this.props.queryParam); // 查询默认条件
    }

    // 打印数据
    printExcel = () => {
        actions.quote.printExcel({
            queryParams:
                {
                    funccode: 'quote',
                    nodekey: '003'
                },
            printParams:
                {
                    id: '91d94bfab32d4bb9afac7fa66b1ae4df'
                }
        });
    }

    columns = [
        {
            title: "客户名称",
            dataIndex: "ppcusname",
            key: "ppcusname",
            width: 100
        },
        {
            title: "设计中心",
            dataIndex: "ppdesignCenter",
            key: "ppdesignCenter",
            width: 100
        },
        {
            title: "项目地址",
            dataIndex: "ppcusaddress",
            key: "ppcusaddress",
            width: 100
        },
        {
            title: "报价名称",
            dataIndex: "quotename",
            key: "quotename",
            width: 100
        },
        {
            title: "报价金额",
            dataIndex: "ppTotalAmount",
            key: "ppTotalAmount",
            width: 100
        },
        {
            title: "状态",
            dataIndex: "usedFlag",
            key: "usedFlag",
            width: 100,
            render(record, text, index) {
                return record === "0" ? "未使用" : "已使用";
            }
        }
    ];

    createQuote = () => {
        const {ppcusname, ppcusid, ppcusno, ppcusaddress, ppdesignCenter} = this.props;
        if (!ppcusid) {
            Warning("请先选择客户");
            return;
        }
        actions.quote.createQuote({
            ppcusname,
            ppcusid,
            ppcusno,
            ppcusaddress,
            ppdesignCenter,
            ppTotalAmount: 0
        });
    }

    referOtherQuote = () => {
        const {ppcusid} = this.props;
        if (!ppcusid) {
            Warning("请先选择客户");
            return;
        }
        this.setState({showModal: true});
        actions.quote.getOtherQuotes();
    }

    submitPrice = () => {
        actions.quote.submitPrice();
    }


    getSelectedDataFunc = selectData => {
        this.setState({selectData});
    }

    onClose = () => {
        this.setState({showModal: false});
    };

    onConfirm = () => {
        const {selectData} = this.state;
        const {ppcusid} = this.props;

        if (selectData.length == 0 || selectData.length > 1) {
            return;
        }
        this.setState({showModal: false});
        actions.quote.saveReferQuote({
            custid: ppcusid,
            mainId: selectData[0].id
        });

    }

    render() {
        const _this = this;
        const {ppdesignCenter, ppcusaddress, showLoading, ohterQuotes, quoteList} = _this.props;
        const {showModal} = this.state;
        const paginationObj = {
            // 分页
            // horizontalPosition: "right",
            verticalPosition: "none"
        };
        return (
            <div className="quote">
                <Loading showBackDrop={true} loadingType="line" show={showLoading} fullScreen={true}/>
                <div className="pro-info">
                    <Row>
                        <Col md={4} xs={12} sm={12}>
                            客户名称：
                            <RefMultipleTableWithInput
                                placeholder="请选择客户"
                                title={"客户列表"}
                                backdrop={true}
                                disabled={false}
                                multiple={false}
                                strictMode={true}
                                param={{
                                    //url请求参
                                    refCode: "poc_customer" //test_common||test_grid||test_tree||test_treeTable
                                }}
                                refModelUrl={{
                                    tableBodyUrl: `${GROBAL_HTTP_CTX}/common-ref/blobRefTreeGrid`, //表体请求
                                    refInfo: `${GROBAL_HTTP_CTX}/common-ref/refInfo` //表头请求
                                }}
                                matchUrl={`${GROBAL_HTTP_CTX}/common-ref/matchPKRefJSON`}
                                filterUrl={`${GROBAL_HTTP_CTX}/common-ref/filterRefJSON`}
                                valueField={"refname"}
                                displayField={"{refname}"}
                                onSave={(ref) => {
                                    console.log(ref);
                                    actions.quote.updateState({
                                        ppcusname: ref[0]["name"],// 客户名称
                                        ppcusid: ref[0]["id"],//   客户id
                                        ppcusno: ref[0]["refcode"], //  客户编码
                                        ppdesignCenter: ref[0]["desgin_centor"],
                                        ppcusaddress: ref[0]["address"],
                                        partList: []
                                    });
                                    actions.quote.getQuotes({id: ref[0].id})
                                }}
                                // {...getFieldProps("valueField", {
                                //   initialValue: '{"refname":"高级-T3","refpk":"level5"}',
                                //   rules: [
                                //     {
                                //       message: "请输入姓名",
                                //       pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                                //     }
                                //   ]
                                // })}
                            />
                        </Col>
                        <Col md={4} xs={12} sm={12}>
                            设计中心：
                            <FormControl value={ppdesignCenter} readOnly/>
                        </Col>
                        <Col md={4} xs={12} sm={12}>
                            项目地址：
                            <FormControl value={ppcusaddress} readOnly/>
                        </Col>
                    </Row>
                </div>
                <div>
                    <div className="btns-row">
                        <Button
                            colors="primary"
                            size="sm"
                            onClick={this.createQuote}
                        >
                            创建报价
                        </Button>
                        <Button colors="primary" size="sm"
                                onClick={this.referOtherQuote}
                        >
                            参考其他项目报价
                        </Button>
                        <Button colors="primary" size="sm"
                                onClick={this.submitPrice}
                                disabled={quoteList.length ? false : true}>
                            提交报价
                        </Button>
                        <Button colors="primary" size="sm" onClick={() => {
                            _this.printExcel()
                        }}>
                            打印报价
                        </Button>
                    </div>
                    <Row>
                        <Col md={4} xs={12} sm={12}>
                            <div className="create-name">
                                <QuoteTable {...this.props} />
                            </div>
                            <div className="create-part">
                                <Part {...this.props} />
                            </div>
                        </Col>
                        <Col md={8} xs={12} sm={12}>
                            <div className="create-project">
                                <Subject {...this.props} />
                            </div>
                        </Col>
                    </Row>
                </div>
                <Modal show={showModal} backdrop={true} onHide={this.onClose}>
                    <Modal.Header>
                        <Modal.Title> 其他项目报价 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid
                            rowKey={(r, i) => r.id}
                            columns={this.columns}
                            data={ohterQuotes}
                            paginationObj={paginationObj}
                            showFilterMenu={true} //是否显示行过滤菜单
                            multiSelect={true} //false 单选，默认多选
                            getSelectedDataFunc={this.getSelectedDataFunc}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={this.onConfirm}
                            colors="primary"
                            style={{marginRight: 25}}
                        >
                            确认
                        </Button>
                        <Button onClick={this.onClose} shape="border">
                            关闭
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Quote;
