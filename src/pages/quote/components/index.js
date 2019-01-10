import React, {Component} from 'react';
import {actions} from 'mirrorx';
import {Icon, Loading, Row, Col, Button} from 'tinper-bee';
// import Grid from 'components/Grid';
import Subject from './Subject';


import Part from './Part'
import QuoteTable from './Quote'

// import 'bee-complex-grid/build/Grid.css';
// import 'bee-pagination/build/Pagination.css'
// import 'bee-table/build/Table.css';
// import 'bee-input-number/build/InputNumber.css';
import './index.less';


class Quote extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {
        // actions.query.loadList(this.props.queryParam); // 查询默认条件
    }


    render() {
        const _this = this;
        const {subjectObj, subjectModalObj, partObj, quoteIndex, partIndex, quoteList} = _this.props;

        return (
            <div className='quote'>
                <div className="query-name">创建项目</div>
                <div>
                    <div className="btns-row">
                        <Button colors="primary" size="sm" onClick={() => actions.quote.createQuote()}>创建报价</Button>
                        <Button colors="primary" size="sm">参考其他项目报价</Button>
                        <Button colors="primary" size="sm">提交报价</Button>
                        <Button colors="primary" size="sm">打印报价</Button>
                    </div>
                    <Row>
                        <Col md={4} xs={12} sm={12}>
                            <div className='create-name'>
                                <QuoteTable quoteList={quoteList} quoteIndex={quoteIndex}/>
                            </div>
                            <div className='create-part'>
                                <Part partObj={partObj} partIndex={partIndex}/>
                            </div>
                        </Col>
                        <Col md={8} xs={12} sm={12}>
                            <div className="create-project">
                                <Subject
                                    subjectObj={subjectObj}
                                    subjectModalObj={subjectModalObj}/>
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Quote;
