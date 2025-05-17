import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';

import {
  Alert,
  Row, Col,
  CardHeader,
  Card,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import PageTitle from '../../Layout/AppMain/PageTitle';

import SymptomPictorialChart from '../../components/charts/SymptomPictorialChart';
import AgeRangeLineChart from '../../components/charts/AgeRangeLineChart';
import CaseOverTimeLineChart from '../../components/charts/CaseOverTimeLineChart';
import DienBienDuongTinhColumnChart from '../../components/charts/DienBienDuongTinhColumnChart';
import { Table } from '../../components/table/Table';
import CaTheoTinhThanhColumn from '../../components/charts/CaTheoTinhThanhColumn';
import { DailyStatCards } from '../../components/common/DailyStatCards';

export default class AnalyticsDashboard1 extends Component {
  constructor() {
    super();

    this.state = {
      dropdownOpen: false,
      activeTab1: '11',

    };
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({
        activeTab1: tab,
      });
    }
  }

  render() {
    return (
      <div className="p-5">
        <ReactCSSTransitionGroup
          component="div"
          classNames="TabsAnimation"
          appear
          appearTimeout={0}
          enter={false}
          exit={false}
        >
          <div>
            <Row>
              <Col md={12} className="mb-3">
                <PageTitle
                  heading="COVID-19 DASHBOARD (TỪ T1/2020)"
                  subheading="THỐNG KÊ ĐỘC QUYỀN THUỘC TỔ THÔNG TIN ĐÁP ỨNG NHANH BCĐQG PC DỊCH COVID-19 VIỆN VỆ SINH DỊCH TỄ TRUNG ƯƠNG"
                  icon="pe-7s-graph1 icon-gradient bg-mean-fruit pe-spin"
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Alert color="danger fsize-2 w-100">
                  <b>KHẨN CẤP: </b>
                  {'Phát hiện những dấu hiệu bất thường liên quan đến COVID-19? Báo tin trực tiếp tới Tổ Truy Vết F0-F1-F2 '}
                  <Link to="/lien-he-to-chong-dich" className="alert-link">TẠI ĐÂY </Link>
                </Alert>
              </Col>
            </Row>
            <Row>
              <DailyStatCards />
            </Row>
            <Row>
              <Col md="12" lg="6">
                <div className="card mb-3 mb-auto widget-chart">
                  <CardHeader className="card-header-tab">
                    <div className="card-header-title">
                      <i className="header-icon lnr-bullhorn icon-gradient bg-tempting-azure"> </i>
                      Diễn biến các ca dương tính
                    </div>
                  </CardHeader>
                  <DienBienDuongTinhColumnChart />
                </div>
              </Col>
              <Col md="12" lg="6">
                <div className="card mb-3 widget-chart">
                  <CardHeader className="card-header-tab">
                    <div className="card-header-title">
                      <i className="header-icon lnr-chart-bars icon-gradient bg-tempting-azure"> </i>
                      Xu hướng lây lan
                    </div>
                  </CardHeader>
                  <CaseOverTimeLineChart />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="12" lg="6">
                <div className="card mb-3 mb-auto widget-chart">
                  <CardHeader className="card-header-tab">
                    <div className="card-header-title">
                      <i className="header-icon lnr-heart-pulse icon-gradient bg-tempting-azure"> </i>
                      Triệu chứng thường gặp
                    </div>
                  </CardHeader>
                  <SymptomPictorialChart />
                </div>
              </Col>
              <Col md="12" lg="6">
                <div className="card mb-3 widget-chart">
                  <CardHeader className="card-header-tab">
                    <div className="card-header-title">
                      <i className="header-icon lnr-users icon-gradient bg-tempting-azure"> </i>
                      Thống kê mắc theo độ tuổi
                    </div>
                  </CardHeader>
                  <AgeRangeLineChart />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="12" lg="6">
                <Card className="main-card mb-3">
                  <div className="card-header">
                    Ca bệnh theo tỉnh thành
                  </div>
                  <div className="table-responsive">
                    <CaTheoTinhThanhColumn />
                  </div>
                </Card>
              </Col>
              <Col md="12" lg="6">
                <Card className="main-card mb-3">
                  <div className="card-header">
                    Tình trạng bệnh nhân
                  </div>
                  <div className="table-responsive">
                    <Table />
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}