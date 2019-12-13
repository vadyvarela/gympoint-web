import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

import { getRequest, deleteRequest } from '~/store/modules/students/actions';

import {
    Container,
    Header,
    Content,
    StudentTable,
    ButtonDelete,
} from '../_layout/default/styles';

export default function Students() {
    const [termSearch, setTermSearch] = useState('');
    const dispatch = useDispatch();

    const [students, setStudents] = useState([]);

    useEffect(() => {
        dispatch(getRequest({ name: termSearch, page: 1 }));
      }, []); // eslint-disable-line
    function handleDeleteStudent(id) {
        dispatch(deleteRequest(id));

        const _students = students.filter(item => item.id !== id);
        setStudents(_students);
    }

    function handleSearchMain(value, page = 1) {
        setTermSearch(value);
        dispatch(getRequest({ name: value, page }));
    }

    function handleLoadPage(page) {
        handleSearchMain(termSearch, page);
    }
}
