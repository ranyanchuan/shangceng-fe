import React, { Component } from "react";
import Grid from "components/Grid";

import "bee-complex-grid/build/Grid.css";
import "bee-pagination/build/Pagination.css";
import "bee-table/build/Table.css";
import "./index.less";

class QuoteTable extends Component {
  render() {
    const { quoteList } = this.props;
    const columns = [
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

    const paginationObj = {
      // 分页
      // horizontalPosition: "right",
      verticalPosition: "none"
    };
    return (
      <div>
        <Grid
          rowKey={(r, i) => r.id}
          columns={columns}
          data={quoteList}
          paginationObj={paginationObj}
          getSelectedDataFunc  ={(arr) => {
              console.log("click",arr)
          }}
        />
      </div>
    );
  }
}

export default QuoteTable;
