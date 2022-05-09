import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Accordion, ButtonGroup, Badge, useAccordionButton } from "react-bootstrap";
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
            imdb: props.initialParams?.imdb || 0,
            genres: props.initialParams?.genres?.length
                ? [...props.initialParams.genres.map((item) => ({ "value": item, "label": item }))] : [],
            genresLogic: props.initialParams?.genresLogic || "$in",
            types: props.initialParams?.types?.length
                ? [...props.initialParams.types.map((item) => ({ "value": item, "label": item }))] : [],
            withPoster: props.initialParams?.withPoster || false,
            actors: props.initialParams?.actors?.length ?
                [...props.initialParams.actors.map((item) => ({ "value": item, "label": item }))] : [],
            actorsLogic: props.initialParams?.actorsLogic || "$in",
            countries: props.initialParams?.countries?.length ?
                [...props.initialParams.countries.map((item) => ({ "value": item, "label": item }))] : [],
            countriesLogic: props.initialParams?.countriesLogic || "$in",
            languages: props.initialParams?.languages?.length ?
                [...props.initialParams.languages.map((item) => ({ "value": item, "label": item }))] : [],
            languagesLogic: props.initialParams?.languagesLogic || "$in",
            writers: props.initialParams?.writers?.length ?
                [...props.initialParams.writers.map((item) => ({ "value": item, "label": item }))] : [],
            writersLogic: props.initialParams?.writersLogic || "$in",
            directors: props.initialParams?.directors?.length ?
                [...props.initialParams.directors.map((item) => ({ "value": item, "label": item }))] : [],
            directorsLogic: props.initialParams?.directorsLogic || "$in",
            rates: props.initialParams?.rates?.length ?
                [...props.initialParams.rates.map((item) => ({ "value": item, "label": item }))] : [],
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
                genresLogic: values.genresLogic,
                actorsLogic: values.actorsLogic,
                countriesLogic: values.countriesLogic,
                languagesLogic: values.languagesLogic,
                writersLogic: values.writersLogic,
                directorsLogic: values.directorsLogic,
            });
        },
    });

    const clearParams = () => {
        formik.resetForm({
            values: {
                yearFrom: 1891,
                yearTo: 2016,
                textInPlot: false,
                text: "",
                imdb: 0,
                genres: [],
                types: [],
                withPoster: false,
                actors: [],
                countries: [],
                languages: [],
                writers: [],
                directors: [],
                rates: []
            }
        });
        props.setParams(null);
    }

    const handleSelectChanges = (field) => (selected) => {
        formik.setFieldValue(field, selected);
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
                    <div style={{ width: "100%" }}>
                        {props.isUsed ? <ParamsBadges values={formik.values} /> : "Search params"}
                    </div>
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
                                        <Row>
                                            <Col><Form.Check
                                                name="textInPlot"
                                                checked={formik.values.textInPlot}
                                                onChange={formik.handleChange}
                                                type="checkbox"
                                                label="Search in plot"
                                            /></Col>
                                            <Col><Form.Check
                                                name="withPoster"
                                                checked={formik.values.withPoster}
                                                onChange={formik.handleChange}
                                                type="checkbox"
                                                label="With poster only"
                                            /></Col>
                                        </Row>
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
                                            handler={handleSelectChanges('genres')}
                                            value={formik.values.genres}
                                            cat={"genres"}
                                            logic={true}
                                            logicHandler={handleSelectChanges("genresLogic")}
                                            logicVal={formik.values.genresLogic}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group >
                                        <AsyncMultiSelect
                                            handler={handleSelectChanges('types')}
                                            value={formik.values.types}
                                            cat={"types"}
                                        />
                                    </Form.Group>
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
                                        logic={true}
                                        logicHandler={handleSelectChanges("actorsLogic")}
                                        logicVal={formik.values.actorsLogic}
                                    />
                                </Col>
                                <Col>
                                    <AsyncMultiSelect
                                        handler={handleSelectChanges("countries")}
                                        value={formik.values.countries}
                                        cat={"countries"}
                                        logic={true}
                                        logicHandler={handleSelectChanges("countriesLogic")}
                                        logicVal={formik.values.countriesLogic}
                                    />
                                </Col>
                                <Col>
                                    <AsyncMultiSelect
                                        handler={handleSelectChanges("languages")}
                                        value={formik.values.languages}
                                        cat={"languages"}
                                        logic={true}
                                        logicHandler={handleSelectChanges("languagesLogic")}
                                        logicVal={formik.values.languagesLogic}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <AsyncMultiSelect
                                        handler={handleSelectChanges("writers")}
                                        value={formik.values.writers}
                                        cat={"writers"}
                                        logic={true}
                                        logicHandler={handleSelectChanges("writersLogic")}
                                        logicVal={formik.values.writersLogic}
                                    />
                                </Col>
                                <Col>
                                    <AsyncMultiSelect
                                        handler={handleSelectChanges("directors")}
                                        value={formik.values.directors}
                                        cat={"directors"}
                                        logic={true}
                                        logicHandler={handleSelectChanges("directorsLogic")}
                                        logicVal={formik.values.directorsLogic}
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

const AsyncMultiSelect = ({ handler, value, cat, logic, logicHandler, logicVal }) => {

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
        if (cat === 'types') {
            return callback(movieTypes.map((item) => ({ value: item, label: item })).filter((item) => item.value.includes(search)));
        }
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

    const handleLogicChange = (value) => {
        logicHandler(value);
    }

    return <>
        <Form.Label>{cat[0].toUpperCase() + cat.slice(1)}</Form.Label>
        <Row>
            <Col xs={(logic && value.length > 1) ? 8 : 12}>
                <AsyncSelect
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
            </Col>
            {(logic && value.length > 1)
                ? <Col xs={4}>
                    <ButtonGroup className="btn-block">
                        <Button
                            variant={logicVal === "$in" ? "success" : "outline-success"}
                            value={"$in"}
                            onClick={() => { handleLogicChange("$in") }}>
                            OR
                        </Button>
                        <Button
                            variant={logicVal === "$all" ? "success" : "outline-success"}
                            value={"$all"}
                            onClick={() => { handleLogicChange("$all") }}>
                            AND
                        </Button>
                    </ButtonGroup>
                </Col>
                : <></>
            }
        </Row>

    </>
}

const ParamsBadges = ({ values }) => {

    const generateForArray = (values, logic = null) => {
        const badgeString = values.map(item => item.label).join(', ');
        const logicString = logic && values.length > 1 ? (logic === "$in" ? "(in)" : "(all)") : "";
        return <Badge
            bg="info"
            style={{ marginLeft: "10px" }}
            title={badgeString + " " + logicString}>
            {badgeString.length > 15 ? (badgeString.slice(0, 15) + "...") : badgeString} {logicString}
        </Badge>
    }

    return <>
        {values.text &&
            <Badge
                bg="info"
                style={{ marginLeft: "10px" }}
                title={values.text}>
                {values.text.length > 20 ? (values.text.slice(0, 20) + "...") : values.text}
                {values.textInPlot && "*"}
            </Badge>}
        {(values.yearFrom !== 1891 || values.yearTo !== 2016) &&
            <Badge bg="info" style={{ marginLeft: "10px" }}>{values.yearFrom} - {values.yearTo}</Badge>}
        {values.imdb > 0 &&
            <Badge bg="info" style={{ marginLeft: "10px" }}>IMDB: {values.imdb}+</Badge>}
        {values.withPoster > 0 &&
            <Badge bg="info" style={{ marginLeft: "10px" }}>With image</Badge>}
        {values.genres?.length > 0 && generateForArray(values.genres, values.genresLogic)}
        {values.types?.length > 0 && generateForArray(values.types)}
        {values.actors?.length > 0 && generateForArray(values.actors, values.actorsLogic)}
        {values.countries?.length > 0 && generateForArray(values.countries, values.countriesLogic)}
        {values.languages?.length > 0 && generateForArray(values.languages, values.languagesLogic)}
        {values.writers?.length > 0 && generateForArray(values.writers, values.writersLogic)}
        {values.directors?.length > 0 && generateForArray(values.directors, values.directorsLogic)}
        {values.rates?.length > 0 && generateForArray(values.rates)}
    </>
}

export default SearchParams;