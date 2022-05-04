import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Accordion, ButtonGroup, Badge, useAccordionButton } from "react-bootstrap";
import Checkbox from "react-custom-checkbox";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { getCats } from "../../api/catsAPI";
import { movieTypes } from "../../constants/categories";

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
            actors: props.initialParams?.actors?.length ?
                [...props.initialParams.actors.map((item) => ({ "value": item, "label": item }))]
                : [],
            countries: props.initialParams?.countries?.length ?
                [...props.initialParams.countries.map((item) => ({ "value": item, "label": item }))]
                : [],
            languages: props.initialParams?.languages?.length ?
                [...props.initialParams.languages.map((item) => ({ "value": item, "label": item }))]
                : [],
            writers: props.initialParams?.writers?.length ?
                [...props.initialParams.writers.map((item) => ({ "value": item, "label": item }))]
                : [],
            directors: props.initialParams?.directors?.length ?
                [...props.initialParams.directors.map((item) => ({ "value": item, "label": item }))]
                : [],
            rates: props.initialParams?.rates?.length ?
                [...props.initialParams.rates.map((item) => ({ "value": item, "label": item }))]
                : [],
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
                textInPlot: values.textInPlot,
                actors: values.actors.map((item) => item.value),
                countries: values.countries.map((item) => item.value),
                languages: values.languages.map((item) => item.value),
                writers: values.writers.map((item) => item.value),
                directors: values.directors.map((item) => item.value),
                rates: values.rates.map((item) => item.value),
            });
        },
    });

    const clearParams = () => {
        formik.setFieldValue('yearFrom', 1800);
        formik.setFieldValue('yearTo', 2017);
        formik.setFieldValue('text', '');
        formik.setFieldValue('textInPlot', false);
        formik.setFieldValue('imdb', 1);
        formik.setFieldValue('genres', []);
        formik.setFieldValue('types', []);
        formik.setFieldValue('withPoster', false);
        formik.setFieldValue('actors', []);
        formik.setFieldValue('countries', []);
        formik.setFieldValue('languages', []);
        formik.setFieldValue('writers', []);
        formik.setFieldValue('directors', []);
        formik.setFieldValue('rates', []);
        props.setParams(null)
    }

    const handleSelectChanges = (field) => (selected) => {
        formik.setFieldValue(field, selected);
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
        <Accordion defaultActiveKey="0">
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
                                        <AsyncMultiSelect
                                            handler={handleGenresChange}
                                            value={formik.values.genres}
                                            cat={"genres"}
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
                            <Row>
                                <Col>
                                    <AsyncMultiSelect
                                        handler={handleSelectChanges("actors")}
                                        value={formik.values.actors}
                                        cat={"actors"}
                                    />
                                </Col>
                                <Col>
                                    <AsyncMultiSelect
                                        handler={handleSelectChanges("countries")}
                                        value={formik.values.countries}
                                        cat={"countries"}
                                    />
                                </Col>
                                <Col>
                                    <AsyncMultiSelect
                                        handler={handleSelectChanges("languages")}
                                        value={formik.values.languages}
                                        cat={"languages"}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <AsyncMultiSelect
                                        handler={handleSelectChanges("writers")}
                                        value={formik.values.writers}
                                        cat={"writers"}
                                    />
                                </Col>
                                <Col>
                                    <AsyncMultiSelect
                                        handler={handleSelectChanges("directors")}
                                        value={formik.values.directors}
                                        cat={"directors"}
                                    />
                                </Col>
                                <Col>
                                    <AsyncMultiSelect
                                        handler={handleSelectChanges("rates")}
                                        value={formik.values.rates}
                                        cat={"rates"}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    </div >
}

const AsyncMultiSelect = ({ handler, value, cat }) => {

    const [inputValue, setInputValue] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const debounce = (cb, delay = 1000) => {
        return (...args) => {
            clearTimeout(debounceTimeout)
            setDebounceTimeout(setTimeout(() => {
                cb(...args)
            }, delay))
        }
    }

    const loadOptions = (search = inputValue, callback) => {
        getCats(cat, search).then(res => {
            if (res.data[cat].length) {
                return callback(res.data[cat].map(item => ({ value: item.name, label: item.name })));
            } else {
                return callback([]);
            }
        })
    };

    const handleInputChange = (newValue) => {
        setInputValue(newValue);
        return newValue;
    };

    return <AsyncSelect
        cacheOptions
        loadOptions={debounce(loadOptions)}
        onInputChange={handleInputChange}
        defaultOptions
        onChange={handler}
        defaultValue={value}
        value={value}
        isMulti
        name={cat}
        className="basic-multi-select"
        classNamePrefix="select"
    />
}

export default SearchParams;