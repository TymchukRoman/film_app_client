import { useFormik } from "formik";
import React from "react";
import { Form, Button, Row, Col, Container, Accordion, ButtonGroup, Badge, useAccordionButton } from "react-bootstrap";
import Checkbox from "react-custom-checkbox";
import Select from 'react-select';
import { movieGenres, movieTypes } from "../../constants/categories";

const SearchParams = (props) => {

    const formik = useFormik({
        initialValues: {
            yearFrom: props.initialParams?.year?.from || 1891,
            yearTo: props.initialParams?.year?.to || 2016,
            textInPlot: props.initialParams?.textInPlot || false,
            text: props.initialParams?.text || "",
            imdb: props.initialParams?.imdb || 1,
            genres: props.initialParams?.genres?.length
                ? [...props.initialParams.genres.map((item) => ({ "value": item, "label": item }))]
                : [],
            types: props.initialParams?.types?.length
                ? [...props.initialParams.types.map((item) => ({ "value": item, "label": item }))]
                : [],
            withPoster: props.initialParams?.withPoster || false,
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
                types: values.types.map((item) => item.value),
                withPoster: values.withPoster,
                textInPlot: values.textInPlot
            });
        },
    });

    const clearParams = () => {
        formik.setFieldValue('yearFrom', 1800);
        formik.setFieldValue('yearTo', 2017);
        formik.setFieldValue('text', '');
        formik.setFieldValue('imdb', 1);
        formik.setFieldValue('genres', []);
        formik.setFieldValue('types', [{ "value": "movie", "label": "movie" }]);
        props.setParams(null)
    }

    const handleGenresChange = (selected) => {
        formik.setFieldValue("genres", selected);
    }

    const handleTypesChange = (selected) => {
        formik.setFieldValue("types", selected);
    }

    const CloseButton = ({ children, variant, type, func }) => {
        const decoratedOnClick = useAccordionButton(0, func);

        return (
            <Button variant={variant} type={type} onClick={decoratedOnClick}>
                {children}
            </Button>
        );
    }

    return <div style={{ padding: "20px" }}>
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>
                    Search params {props.isUsed ? <Badge bg="info" style={{ marginLeft: "10px" }}>Active</Badge> : " "}
                </Accordion.Header>
                <Accordion.Body style={{ padding: "20px" }}>
                    <Form onSubmit={formik.handleSubmit}>
                        <Container>
                            <Row style={{ marginTop: "20px" }}>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Search by text</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="text"
                                            onChange={formik.handleChange}
                                            value={formik.values.text} />
                                        <Checkbox
                                            name="textInPlot"
                                            checked={formik.values.textInPlot}
                                            onChange={(value) => {
                                                formik.setFieldValue("textInPlot", value)
                                            }}
                                            borderColor="#000000"
                                            style={{ cursor: "pointer" }}
                                            labelStyle={{ marginLeft: 5, userSelect: "none" }}
                                            label="Search in plot"
                                        />


                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Range</Form.Label>
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <Form.Control
                                                        min={1891}
                                                        max={2016}
                                                        type="number"
                                                        name="yearFrom"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.yearFrom} />
                                                </Col>
                                                <Col>
                                                    <Form.Control
                                                        min={1891}
                                                        max={2016}
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
                            <Row style={{ marginTop: "20px" }}>
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
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "20px" }}>
                                <Col>
                                    <Checkbox
                                        name="withPoster"
                                        checked={formik.values.withPoster}
                                        onChange={(value) => {
                                            formik.setFieldValue("withPoster", value)
                                        }}
                                        borderColor="#000000"
                                        style={{ cursor: "pointer" }}
                                        labelStyle={{ marginLeft: 5, userSelect: "none" }}
                                        label="With poster only"
                                    />
                                </Col>
                                <Col>
                                </Col>
                                <Col>
                                    <ButtonGroup >
                                        <CloseButton variant="outline-warning" func={clearParams} type="button" >
                                            Clear search
                                        </CloseButton>
                                        <CloseButton variant="outline-success" type="submit" >
                                            Submit
                                        </CloseButton>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    </div >
}

export default SearchParams;