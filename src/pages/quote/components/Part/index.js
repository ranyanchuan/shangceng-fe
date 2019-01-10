import React, { Component } from "react";
import { Button, Table, Grid, FormControl } from "tinper-bee";
import "./index.less";

let partId = 0;

class Part extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partVal: "",
      data: []
    };
  }

  handChange = v => {
    this.setState({
      partVal: v
    });
  };

  //添加部位
  addPart = () => {
    const { data, partVal } = this.state;
    data.push({
      partName: partVal,
      partSubtotal: 0,
      key: ++partId
    });
    this.setState({
      data: data
    });
  };

  //删除部位
  deletePart = index => {
    const data = this.state.data;
    data.splice(index,1)
    this.setState({
        data: data
    })
  };

  render() {
    const _this = this;
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
              onClick={() => {
                _this.deletePart(index);
              }}
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
    return (
      <div className="part">
        <div className="title">部位</div>
        <div className="operate">
          <FormControl
            className="partVal"
            value={this.state.partVal}
            onChange={this.handChange}
            onBlur={this.onBlur}
            placeholder="请输入部位"
            // focusSelect={true}
          />
          <Button colors="primary">参考其他部位</Button>
          <Button colors="primary" onClick={this.addPart}>
            添加
          </Button>
        </div>
        <Grid
          columns={columns}
          data={this.state.data}
        //   onRowClick={(record, index, indent) => {}}
          emptyText={() => {
            return "暂无部位";
          }}
        />
      </div>
    );
  }
}

export default Part;
