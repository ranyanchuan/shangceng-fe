import React, { Component } from "react";
import {actions} from 'mirrorx';

import Grid from "components/Grid";

import "bee-complex-grid/build/Grid.css";
import "bee-pagination/build/Pagination.css";
import "bee-table/build/Table.css";
import "./index.less";

class QuoteTable extends Component {
     columns = [
        {
            title: "报价名称",
            dataIndex: "quoteName",
            key: "quoteName",
            width: 100
        },
        {
            title: "报价金额",
            dataIndex: "quoteAmount",
            key: "quoteAmount",
            width: 100
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            width: 100,
            render(record, text, index){
                console.log(typeof record,record);
                return record === 0 ? "未使用" : "已使用";
            }
        }
    ];

  render() {
    const { quoteList,quoteIndex} = this.props;


    const paginationObj = {
      // 分页
      // horizontalPosition: "right",
      verticalPosition: "none"
    };
    return (
      <div>
        <Grid
          rowKey={(r, i) => r.id}
          columns={this.columns}
          data={quoteList}
          paginationObj={paginationObj}
          getSelectedDataFunc  ={(arr) => {
              console.log("click",arr)
          }}
          rowClassName={(record, index, indent) => {
              return quoteIndex === index ? "selected" : "";
          }}
          onRowClick={(record, index) => {

              // 获取子表数据
              actions.quote.updateState({quoteIndex: index}); // 更新默认主表行 数据
              // const {list} = orderObj;
              // const {pageSize} = detailObj;
              // const {id: search_orderId} = list[index];
              // const param = {search_orderId, pageSize, pageIndex: 0};
              // actions.masterDetailOne.loadOrderDetailList(param);
          }}
        />
      </div>
    );
  }
}

export default QuoteTable;
