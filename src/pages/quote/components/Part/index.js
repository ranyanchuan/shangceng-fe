import React, { Component } from "react";
import { actions } from "mirrorx";
import { Button, Table, FormControl } from "tinper-bee";
import Grid from "components/Grid";

import "bee-complex-grid/build/Grid.css";
import "bee-pagination/build/Pagination.css";
import "bee-table/build/Table.css";
import "./index.less";

class Part extends Component {
  render() {
    const _this = this;
    const { partObj } = this.props;
    const columns = [
      {
        title: "序号",
        dataIndex: "index",
        key: "index",
        width: 80,
        render(record, text, index) {
          return index + 1;
        }
      },
      {
        title: "删除",
        dataIndex: "e",
        key: "e",
        width: 80,
        render(text, record, index) {
          return (
            <a
              href="javascript:;"
              onClick={() => actions.quote.deletePart(index)}
            >
              X
            </a>
          );
        }
      },
      {
        title: "部位名称",
        dataIndex: "partName",
        key: "partName",
        width: 100
      },
      {
        title: "部位小计",
        dataIndex: "partSubtotal",
        key: "partSubtotal",
        width: 100
      }
    ];

    const paginationObj = {
      // 分页
      // horizontalPosition: "right",
      verticalPosition: "none"
    };

    return (
      <div className="part">
        <div className="title"> 部位 </div>
        <div className="operate">
          <FormControl
            className="partVal"
            value={partObj.partVal}
            onChange={actions.quote.partValChange}
            placeholder="请输入部位"
          />
          <Button shape="border" colors="success" size="sm">
            参考其他部位
          </Button>
          <Button
            shape="border"
            colors="success"
            size="sm"
            onClick={() => actions.quote.addPart()}
          >
            添加
          </Button>
        </div>
        <Grid
          rowKey={(r, i) => r.id}
          columns={columns}
          data={partObj.list}
          paginationObj={paginationObj}
          emptyText={() => {
            return "暂无部位";
          }}
        />
      </div>
    );
  }
}

export default Part;