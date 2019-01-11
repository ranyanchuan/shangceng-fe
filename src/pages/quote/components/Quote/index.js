import React, { Component } from "react";
import { actions } from "mirrorx";

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
      render(record, text, index) {
        return record === 0 ? "未使用" : "已使用";
      }
    }
  ];

  render() {
    const { quoteList, quoteIndex } = this.props;

    const paginationObj = {
      // 分页
      // horizontalPosition: "right",
      verticalPosition: "none"
    };
    return (
      <div>
        <Grid
          multiSelect={false} //false 单选，默认多选
          rowKey={(r, i) => r.id}
          columns={this.columns}
          data={quoteList}
          paginationObj={paginationObj}
          getSelectedDataFunc={() => {}}
          rowClassName={(record, index, indent) => {
            return quoteIndex === index ? "selected" : "";
          }}
          onRowClick={(record, index) => {
            console.log(record)
            actions.quote.updateState({ quoteIndex: index }); 
          }}
        />
      </div>
    );
  }
}

export default QuoteTable;
