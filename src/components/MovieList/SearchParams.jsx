import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Select from 'react-select';

const SearchParams = (props) => {

    const formik = useFormik({
        initialValues: {
            yearFrom: 1800,
            yearTo: 2020,
            text: "",
            imdb: 1,
            genres: [],
            type: [],
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values))
        },
    });

    const handleGenresChange = (selected) => {
        formik.setFieldValue("genres", selected)
    }

    const handleTypesChange = (selected) => {
        formik.setFieldValue("type", selected)
    }

    return <div style={{ padding: "20px" }}>
        <Form onSubmit={formik.handleSubmit}>
            <Container>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Search by text</Form.Label>
                            <Form.Control
                                type="text"
                                name="text"
                                onChange={formik.handleChange}
                                value={formik.values.text} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Range</Form.Label>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            name="yearFrom"
                                            onChange={formik.handleChange}
                                            value={formik.values.yearFrom} />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="number"
                                            name="yearTo"
                                            onChange={formik.handleChange}
                                            value={formik.values.yearTo} />
                                    </Col>
                                </Row>
                            </Container>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label>IMDB minimal rating</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Range
                                        min={0}
                                        max={10}
                                        name="imdb"
                                        onChange={formik.handleChange}
                                        value={formik.values.imdb} />

                                </Col>
                                <Col xs="3">
                                    <Form.Control
                                        name="imdb"
                                        disabled={true}
                                        value={formik.values.imdb} />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group >
                            <Select
                                onChange={handleGenresChange}
                                defaultValue={formik.values.genres}
                                isMulti
                                name="genres"
                                options={[
                                    {
                                        label: "Chinese",
                                        value: "zh-CN"
                                    },
                                    {
                                        label: "English (US)",
                                        value: "en-US"
                                    }]}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />

                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Select
                                onChange={handleTypesChange}
                                defaultValue={formik.values.genres}
                                isMulti
                                name="genres"
                                options={[
                                    {
                                        label: "Chinese",
                                        value: "zh-CN"
                                    },
                                    {
                                        label: "English (US)",
                                        value: "en-US"
                                    }]}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />

                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="success" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    </div>
}

export default SearchParams;