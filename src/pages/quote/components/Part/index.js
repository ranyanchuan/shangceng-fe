import React, {Component} from "react";
import {actions} from "mirrorx";
import {Button, Table, FormControl, Modal} from "tinper-bee";
import Grid from "components/Grid";

import "bee-complex-grid/build/Grid.css";
import "bee-pagination/build/Pagination.css";
import "bee-table/build/Table.css";
import "./index.less";

class Part extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };
    }

    columns = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 60,
            render(record, text, index) {
                return index + 1;
            }
        },
        {
            title: "删除",
            dataIndex: "e",
            key: "e",
            width: 50,
            render(text, record, index) {
                const _this = this;
                return (
                    <div className='operation-btn'>
                        <i size='sm' className='uf uf-del' onClick={() => {
                            actions.quote.deletePart(index)
                        }}></i>
                    </div>
                )
            }
        },
        {
            title: "部位名称",
            dataIndex: "ppPositionName",
            key: "ppPositionName",
            width: 150
        },
        {
            title: "部位小计",
            dataIndex: "partSubtotal",
            className: 'column-number-right ', // 靠右对齐
            key: "partSubtotal",
            width: 80,
        },
    ];

    close = () => {
        this.setState({
            showModal: false
        });
    };

    render() {
        const _this = this;
        const {partObj, partIndex} = this.props;

        const paginationObj = {
            // 分页
            // horizontalPosition: "right",
            verticalPosition: "none"
        };

        return (
            <div className="part">
                <div className="title"> 部位</div>
                <div className="operate">
                    <FormControl
                        className="partVal"
                        value={partObj.partVal}
                        onChange={actions.quote.partValChange}
                        placeholder="请输入部位"
                    />
                    <Button
                        style={{marginRight: 16}}
                        colors="primary"
                        size="sm"
                        onClick={() => {
                            this.setState({
                                showModal: true
                            });
                        }}
                    >
                        参考其他部位
                    </Button>
                    <Button
                        colors="primary"
                        size="sm"
                        onClick={() => actions.quote.addPart()}
                    >
                        添加
                    </Button>
                </div>
                <Grid
                    rowKey={(r, i) => r.id}
                    columns={this.columns}
                    data={partObj.list}
                    paginationObj={paginationObj}
                    showFilterMenu={true} //是否显示行过滤菜单
                    multiSelect={false} //false 单选，默认多选
                    rowClassName={(record, index, indent) => {
                        return partIndex === index ? "selected" : "";
                    }}
                    onRowClick={(record, index) => {
                        console.log(record)
                        actions.quote.updateState({partIndex: index});
                    }}
                    getSelectedDataFunc={() => {}}
                />
                <Modal show={this.state.showModal} backdrop={true} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title> 我来组成头部 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body/>
                    <Modal.Footer>
                        <Button onClick={this.close}> 关闭 </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Part;
