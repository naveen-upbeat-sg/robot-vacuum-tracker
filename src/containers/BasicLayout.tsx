import { Typography } from "@mui/material"
import { Fragment } from "react"
import Header from "../components/Header"
import Main from "../components/Main"

const BasicLayout = () => {
    return <Fragment>
        <Header><Typography>Robot Vacuum</Typography></Header>
        <Main></Main>
    </Fragment>
}

export default BasicLayout