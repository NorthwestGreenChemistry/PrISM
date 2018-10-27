// @flow
import * as React from 'react';
import Data from "../components/Data";

type Props = {
    children: React.Node
};

export default class App extends React.Component<Props> {
    props: Props;

  constructor(props) {
    super(props);
  }

    render() {

        //the data singleton is initialized here at first
        let data = new Data();
        const { children } = this.props;
        return <React.Fragment>{children}</React.Fragment>;
    }

}
