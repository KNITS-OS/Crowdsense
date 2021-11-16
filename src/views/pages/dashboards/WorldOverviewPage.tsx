/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { Card, CardBody, Col, Container, Row } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import { VectorMap } from "@react-jvectormap/core";
import worldMill from "@react-jvectormap/world/dist/worldMill.json";

const mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

const WorldOverviewPage = () => {
  return (
    <>
      <SimpleHeader name="Vector maps" parentName="Maps" />
      <Container className="mt--6" fluid>
        <Row>
          <Col>
            <Card>
              <CardBody className="pt-0">
                <VectorMap
                  containerClassName="vector-map"
                  className="vector-map"
                  style={{
                    height: "600px",
                  }}
                  map={worldMill}
                  zoomOnScroll={false}
                  backgroundColor="transparent"
                  regionStyle={{
                    initial: {
                      fill: "#e9ecef",
                      // @ts-ignore
                      "fill-opacity": 0.8,
                      stroke: "none",
                      "stroke-width": 0,
                      "stroke-opacity": 1,
                    },
                    hover: {
                      fill: "#dee2e6",
                      // @ts-ignore
                      "fill-opacity": 0.8,
                      cursor: "pointer",
                    },
                    selected: {
                      fill: "yellow",
                    },
                  }}
                  markerStyle={{
                    initial: {
                      fill: "#fb6340",
                      // @ts-ignore
                      "stroke-width": 0,
                    },
                    hover: {
                      fill: "#11cdef",
                      // @ts-ignore
                      "stroke-width": 0,
                      border: 0,
                    },
                  }}
                  markers={[
                    {
                      latLng: [41.9, 12.45],
                      name: "Vatican City",
                    },
                    {
                      latLng: [43.73, 7.41],
                      name: "Monaco",
                    },
                    {
                      latLng: [35.88, 14.5],
                      name: "Malta",
                    },
                    {
                      latLng: [1.3, 103.8],
                      name: "Singapore",
                    },
                    {
                      latLng: [1.46, 173.03],
                      name: "Kiribati",
                    },
                    {
                      latLng: [-21.13, -175.2],
                      name: "Tonga",
                    },
                    {
                      latLng: [15.3, -61.38],
                      name: "Dominica",
                    },
                    {
                      latLng: [-20.2, 57.5],
                      name: "Mauritius",
                    },
                    {
                      latLng: [26.02, 50.55],
                      name: "Bahrain",
                    },
                  ]}
                  series={{
                    regions: [
                      {
                        //@ts-ignore
                        values: mapData,
                        //@ts-ignore
                        scale: ["#ced4da", "#adb5bd"],
                        normalizeFunction: "polynomial",
                        attribute: "fill",
                      },
                    ],
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WorldOverviewPage;
