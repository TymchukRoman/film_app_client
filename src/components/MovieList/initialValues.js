const initial = {
    yearFrom: 1891,
    yearTo: 2016,
    textInPlot: false,
    text: "",
    imdb: 0,
    genres: [],
    genresLogic: "$in",
    types: [],
    withPoster: false,
    actors: [],
    actorsLogic: "$in",
    countries: [],
    countriesLogic: "$in",
    languages: [],
    languagesLogic: "$in",
    writers: [],
    writersLogic: "$in",
    directors: [],
    directorsLogic: "$in",
    rates: [],
    isEq(values) {
        for (const key in values) {
            if (this[key] !== undefined && values[key] !== this[key]) {
                return false;
            }
        }
        return true;
    },
    getInitial(initialParams) {
        return {
            yearFrom: initialParams?.year?.from || this.yearFrom,
            yearTo: initialParams?.year?.to || this.yearTo,
            textInPlot: initialParams?.textInPlot || this.textInPlot,
            text: initialParams?.text || this.text,
            imdb: initialParams?.imdb || this.imdb,
            genres: initialParams?.genres?.length
                ? [...initialParams.genres.map((item) => ({ "value": item, "label": item }))] : this.genres,
            genresLogic: initialParams?.genresLogic || this.genresLogic,
            types: initialParams?.types?.length
                ? [...initialParams.types.map((item) => ({ "value": item, "label": item }))] : this.types,
            withPoster: initialParams?.withPoster || this.withPoster,
            actors: initialParams?.actors?.length ?
                [...initialParams.actors.map((item) => ({ "value": item, "label": item }))] : this.actors,
            actorsLogic: initialParams?.actorsLogic || this.actorsLogic,
            countries: initialParams?.countries?.length ?
                [...initialParams.countries.map((item) => ({ "value": item, "label": item }))] : this.countries,
            countriesLogic: initialParams?.countriesLogic || this.countriesLogic,
            languages: initialParams?.languages?.length ?
                [...initialParams.languages.map((item) => ({ "value": item, "label": item }))] : this.languages,
            languagesLogic: initialParams?.languagesLogic || this.languagesLogic,
            writers: initialParams?.writers?.length ?
                [...initialParams.writers.map((item) => ({ "value": item, "label": item }))] : this.writers,
            writersLogic: initialParams?.writersLogic || this.writersLogic,
            directors: initialParams?.directors?.length ?
                [...initialParams.directors.map((item) => ({ "value": item, "label": item }))] : this.directors,
            directorsLogic: initialParams?.directorsLogic || this.directorsLogic,
            rates: initialParams?.rates?.length ?
                [...initialParams.rates.map((item) => ({ "value": item, "label": item }))] : this.rates,
        }
    },
    withValues(values) {
        return {
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
        }
    },
    resetValues() {
        return {
            yearFrom: this.yearFrom,
            yearTo: this.yearTo,
            textInPlot: this.textInPlot,
            text: this.text,
            imdb: this.imdb,
            genres: this.genres,
            types: this.types,
            withPoster: this.withPoster,
            actors: this.actors,
            countries: this.countries,
            languages: this.languages,
            writers: this.writers,
            directors: this.directors,
            rates: this.rates
        }
    }
}

export default initial