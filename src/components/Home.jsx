import React, {useCallback, useEffect, useMemo, useState} from 'react';
import axios from "axios";
import {Button, Form, FormControl, InputGroup, ListGroup, Table} from "react-bootstrap";
import {HandThumbsUp} from 'react-bootstrap-icons'
import {LinkContainer} from 'react-router-bootstrap'
import ReactPaginate from "react-paginate";
import {format, parseISO} from "date-fns";
import {fsParagraph} from "../style/fsParagraph";
import {styleWidth} from "../style/styleWidth";
import {fsSmall} from "../style/fsSmall";

const pageLimit = 10
const initialPage = 1

const Home = () => {
    const [data, setData] = useState([])
    const [value, setValue] = useState("")
    const [totalCount, setTotalCount] = useState(0)

    /*const numberValue = 5
    const stringValue = 'XD'
    const memoizedObject = useMemo(() =>{
        return {num: numberValue, str: stringValue}
    },[numberValue, stringValue]) /!*reference will change only when numberValue or stringValue changes*!/
    const object = {num: numberValue, str: stringValue} /!*reference will change each render*!/*/

    const fetchData = useCallback(async (searchValue = '') => {
        const response = await axios.get(`/adverts`, {
            params: {
                q: searchValue,
                _sort: 'createdOn',
                _order: 'desc',
                _limit: pageLimit,
                _page: initialPage
            }
        });
        setData(response.data)
        setTotalCount(+response.headers['x-total-count'])
        setValue(searchValue)
    }, [])

    useEffect(() => {
        fetchData().then();
    }, [fetchData])

    /*useEffect(() =>{
        const timer = setTimeout(() =>{
            alert("Hello")
        },5000)
        return () => {
            clearTimeout(timer)
        }
    },[value])*/

    const handleReset = async () => {
        await fetchData()
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        await fetchData(value)
    }

    const fetchPageData = async (currentPage) => { /*useCallback*/
        const res = await axios.get(`/adverts`, {
            params: {
                _page: currentPage,
                _sort: 'createdOn',
                _order: 'desc',
                _limit: pageLimit,
            }
        });
        setData(res.data)
    }

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1
        const dataFormServer = await fetchPageData(currentPage)
        return dataFormServer
    }

    const addFavourites = () => {
        alert("1")
    }

    return (
        <div>
            <p className="my-3 text-center" style={fsParagraph}>
                What are you looking for today?
            </p>
            <Form onSubmit={handleSearch} onReset={handleReset}>
                <InputGroup>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Button type="submit" variant="outline-success">Search</Button>
                    <Button type="reset" variant="outline-info">Reset</Button>
                </InputGroup>
            </Form>
            <ListGroup className="mt-3">
                {data.map((advert) => (
                    <ListGroup.Item action className='mb-2' key={advert.id}>
                        <Table size=''>
                            <tbody>
                            <tr>
                                <td rowSpan={2} className="border-0" style={styleWidth}>
                                    <img src={advert.image} style={styleWidth}/>
                                </td>
                                <LinkContainer to={`/advert/${advert.id}`}>
                                    <td valign='top' className="border-0">
                                        {advert.title}
                                    </td>
                                </LinkContainer>
                                <td className="border-0 text-end">
                                    {advert.price} zł.
                                    <p className='text-secondary'
                                       style={fsSmall}>{advert.canNegotiate ? "To negotiate" : ""}</p>
                                </td>
                            </tr>
                            <tr>
                                <td valign='bottom' className="border-0">
                                    {format(parseISO(advert.createdOn), 'yyyy-MM-dd')}
                                </td>
                                <td valign='bottom' className='border-0 text-end'>
                                    <Button variant='none' onClick={addFavourites}>
                                        <HandThumbsUp/>
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <ReactPaginate pageCount={Math.ceil(totalCount / pageLimit)}
                           marginPagesDisplayed={1}
                           pageRangeDisplayed={3}
                           onPageChange={handlePageClick}
                           containerClassName={'pagination justify-content-center'}
                           pageClassName={'page-item'}
                           pageLinkClassName={'page-link'}
                           previousClassName={'page-item'}
                           previousLinkClassName={'page-link'}
                           nextClassName={'page-item'}
                           nextLinkClassName={'page-link'}
                           breakClassName={'page-item'}
                           breakLinkClassName={'page-link'}
                           activeClassName={'active'}
            />
        </div>
    );
};

export default Home;