import React, {Component} from "react";
import {actions} from "mirrorx";
import {Table, FormControl, Modal} from "tinper-bee";
import Button from 'components/Button';
import Grid from "components/Grid";
import ReferModal from './referModal'
import { Warning } from "utils";


import "bee-complex-grid/build/Grid.css";
import "bee-pagination/build/Pagination.css";
import "bee-table/build/Table.css";
import "./index.less";

class Part extends Component {
    constructor() {
        super();
        this.state = {
            showReferModal:false
        };
    }

    handPartNameChange = (val) => {
        actions.quote.updateState({
            partName:val
        })
    }

    addPart = () => {
        const { ppcusid, ppcusno, pid, partName } = this.props;
        actions.quote.addPart({partName, ppcusid, ppcusno, pid})
    }

    referOtherParts = () => {
        const { partName } = this.props;
        const _partName = partName.trim();
        if (!_partName) {
            Warning("请输入部位名称")
            return;
        }

        this.setState({
            showReferModal: true
        });
        actions.quote.getReferParts();
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
                return (
                    <div className='operation-btn'>
                        <i size='sm' className='uf uf-del' onClick={(e) => {
                            e.stopPropagation()
                            actions.quote.deletePart({id:record.id})
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

    closeModal = () => {
        this.setState({
            showReferModal: false
        });
    };

    render() {
        const _this = this;
        const {partList, partIndex, pid, partName } = this.props;
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
                        value={partName}
                        onChange={this.handPartNameChange}
                        placeholder="请输入部位"
                    />
                    <div>
                    <Button
                        colors="primary"
                        size="sm"
                        onClick={this.addPart}
                        disabled = { pid ? false : true }
                    >
                        添加
                    </Button>
                    <Button
                        style={{marginRight: 16}}
                        colors="primary"
                        size="sm"
                        onClick={this.referOtherParts}
                        disabled = { pid ? false : true }
                    >
                        参考其他部位
                    </Button>
                    </div>


                </div>
                <Grid
                    rowKey={(r, i) => r.id}
                    columns={this.columns}
                    data={partList}
                    paginationObj={paginationObj}
                    showFilterMenu={true} //是否显示行过滤菜单
                    multiSelect={false} //false 单选，默认多选
                    rowClassName={(record, index, indent) => {
                        return partIndex === index ? "selected" : "";
                    }}
                    onRowClick={(record, index) => {
                        console.log(record)
                        actions.quote.updateState({partIndex: index, selectedPartId:record.id});
                        // 查询项目
                        const param={search_pid:record.id};
                        actions.quote.loadSubjectList(param); // 查询默认条件
                    }}
                    getSelectedDataFunc={() => {}}
                />
               <ReferModal {...this.props} showReferModal={this.state.showReferModal} closeModal={this.closeModal}/>
            </div>
        );
    }
}

export default Part;
