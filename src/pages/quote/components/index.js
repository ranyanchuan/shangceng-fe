import React, {Component} from 'react';
import {actions} from 'mirrorx';
import {Icon, Loading,Row,Col} from 'tinper-bee';
// import Grid from 'components/Grid';
import Subject from './Subject';



// import 'bee-complex-grid/build/Grid.css';
// import 'bee-pagination/build/Pagination.css'
// import 'bee-table/build/Table.css';
// import 'bee-input-number/build/InputNumber.css';
import './index.less';


class Quote extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    componentDidMount() {
        // actions.query.loadList(this.props.queryParam); // 查询默认条件
    }


    render() {
        const _this = this;
        console.log("======")
        const {subjectObj,subjectModalObj}=_this.props;

        return (
            <div className='quote'>
                <div className="query-name">创建项目</div>
                <div>
                    <Row>
                        <Col md={4} xs={12} sm={12}>
                            <div className='create-name'>4</div>
                            <div className='create-part'>4</div>
                        </Col>
                        <Col md={8} xs={12} sm={12}>
                            <Subject
                                subjectObj={subjectObj}
                                subjectModalObj={subjectModalObj}/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Quote;
