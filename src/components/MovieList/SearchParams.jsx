import { useFormik } from "formik";
import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Select from 'react-select';
import { movieGenres, movieTypes } from "../../constants/categories";

const SearchParams = (props) => {

    const formik = useFormik({
        initialValues: {
            yearFrom: props.initialParams?.year?.from || 1900,
            yearTo: props.initialParams?.year?.from || 2016,
            text: props.initialParams?.text || "",
            imdb: props.initialParams?.imdb || 1,
            genres: props.initialParams?.genres?.length
                ? [...props.initialParams.genres.map((item) => ({ "value": item, "label": item }))]
                : [],
            types: props.initialParams?.types?.length
                ? [...props.initialParams.types.map((item) => ({ "value": item, "label": item }))]
                : [{ "value": "movie", "label": "movie" }],
        },
        onSubmit: (values) => {
            props.setParams({
                year: {
                    from: values.yearFrom,
                    to: values.yearTo
                },
                text: values.text,
                imdb: values.imdb,
                genres: values.genres.map((item) => item.value),
                types: values.types.map((item) => item.value)
            });
        },
    });

    const handleGenresChange = (selected) => {
        formik.setFieldValue("genres", selected)
    }

    const handleTypesChange = (selected) => {
        formik.setFieldValue("types", selected)
    }

    return <div style={{ padding: "20px" }}>
        <Form onSubmit={formik.handleSubmit}>
            <Container>
                <Row style={{ padding: "20px" }}>
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
                                options={movieGenres.map((item) => ({ value: item, label: item }))}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />

                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group >
                            <Select
                                onChange={handleTypesChange}
                                defaultValue={formik.values.types}
                                isMulti
                                name="types"
                                options={movieTypes.map((item) => ({ value: item, label: item }))}
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
                    <Col>
                        <Button variant="success" onClick={() => { props.setParams(null) }}>
                            Clear search
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    </div>
}

export default SearchParams;