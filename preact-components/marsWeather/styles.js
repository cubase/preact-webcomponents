import { css } from 'emotion'
import marsJpg from '../../assets/mars.jpg'

const marsWrapper = css`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)),
    url('${marsJpg}');
  background-size: cover;
  background-position: 30%;
  font-family: 'sans-serif';
  width: 200px;
  padding: 20px 1.5rem;
  color: #fff;
`

const marsHeader = css`
  font-size: 35px;
`

const marsInfo = css`
  font-size: 14px;
  line-height: 1.5em;
  font-weight: 100;
  & a {
    color: inherit;
  }
`

const solCardWrapper = css`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  color: #fff;
  padding: 15px;
`

const solCardHeader = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  & > h2 {
    margin: 0;
    font-size: 20px;
  }
  & > h3 {
    margin: 10px;
    font-weight: 100;
    font-size: 15px;
  }
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`

const solCardMain = css`
  text-align: center;
  font-size: 20px;
  font-weight: 100;
  padding: 1em 0;

  & p {
    margin: 5px 0;
  }
`

const marsStyles = {
  wrapper: marsWrapper,
  header: marsHeader,
  info: marsInfo
}

const solCardStyles = {
  wrapper: solCardWrapper,
  header: solCardHeader,
  main: solCardMain
}

export { marsStyles, solCardStyles }
