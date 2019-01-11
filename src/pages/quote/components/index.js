import React, { Component } from "react";
import { actions } from "mirrorx";
import { Icon, Loading, Row, Col, Button, FormControl } from "tinper-bee";
import Select from "bee-select";
import RefMultipleTableWithInput from "ref-multiple-table";

// import Grid from 'components/Grid';
import Subject from "./Subject";

import Part from "./Part";
import QuoteTable from "./Quote";

// import 'bee-complex-grid/build/Grid.css';
// import 'bee-pagination/build/Pagination.css'
// import 'bee-table/build/Table.css';
// import 'bee-input-number/build/InputNumber.css';
import "ref-multiple-table/dist/index.css";
import "./index.less";

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // actions.query.loadList(this.props.queryParam); // 查询默认条件
  }

  render() {
    const _this = this;
    const {subjectObj, subjectModalObj,subjectModalLoading, partObj, quoteIndex, partIndex, quoteList} = _this.props;

    return (
      <div className="quote">
        <div className="pro-info">
          <Row>
            <Col md={4} xs={12} sm={12}>
              客户名称：
              <RefMultipleTableWithInput
                placeholder="请选择客户"
                title={"复杂表格参照"}
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
                valueField={"refpk"}
                displayField={"{refname}-{refpk}"}
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
              <FormControl readOnly />
            </Col>
            <Col md={4} xs={12} sm={12}>
              项目地址：
              <FormControl readOnly />
            </Col>
          </Row>
        </div>
        <div>
          <div className="btns-row">
            <Button
              colors="primary"
              size="sm"
              onClick={() => actions.quote.createQuote()}
            >
              创建报价
            </Button>
            <Button colors="primary" size="sm">
              参考其他项目报价
            </Button>
            <Button colors="primary" size="sm">
              提交报价
            </Button>
            <Button colors="primary" size="sm">
              打印报价
            </Button>
          </div>
          <Row>
            <Col md={4} xs={12} sm={12}>
              <div className="create-name">
                <QuoteTable quoteList={quoteList} quoteIndex={quoteIndex} />
              </div>
              <div className="create-part">
                <Part partObj={partObj} partIndex={partIndex} />
              </div>
            </Col>
            <Col md={8} xs={12} sm={12}>
              <div className="create-project">
                <Subject
                  subjectObj={subjectObj}
                  subjectModalObj={subjectModalObj}
                    subjectModalLoading={subjectModalLoading}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Quote;
