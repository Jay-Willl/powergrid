import {useState, useEffect, useCallback, useMemo} from 'react';
import {Col, Row, Button} from "antd";

import {Header} from "./component/header.jsx";
import {Footer} from "./component/footer.jsx";
import {Cube} from "./three/Cube.jsx";
import {HeightMap} from "./three/HeightMap.jsx";
import {init, B2Number, Number2B} from "./controller/addition.js";

function App() {

    return (
        <Row gutter={[0, 0]}>
            <Col span={24}
                 style={{
                     width: "max-content",
                     height: "15vh",
                 }}
            >
                <Header/>
            </Col>
            <Col span={24}
                 style={{
                     width: "max-content",
                     height: "80vh",
                     overflowY: "scroll"
                 }}
            >
                <HeightMap info={init(4)}/>
            </Col>
            <Col span={24}
                 style={{
                     width: "max-content",
                     height: "5vh",
                 }}
            >
                <Footer/>
            </Col>
        </Row>
    )
}

export {App}
