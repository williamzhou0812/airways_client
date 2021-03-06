import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './DirectoryDisplayList.css';
import { createImageURL } from '../utils/Constants';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class DirectoryDisplayList extends Component {
    constructor(props) {
        super(props);
        const { setSelectedSection, sectionList, match } = this.props;
        this.props.setBackButton('/around', true);
        setSelectedSection(
            _.find(sectionList.sections, (item, index) => {
                return item.id === parseInt(match.params.id, 10);
            })
        );
        this.state = {
            directoryDisplayList: null,
            currentDirectoryDisplayList: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            directoryDisplayList:
                nextProps.currentSection.sections.directory_display.data,
            currentDirectoryDisplayList:
                nextProps.currentSection.sections.directory_display.data
        });
    }

    handleClick(e, item) {
        this.props.setSelectedDirectoryDisplay(item);
    }

    renderEmptyDirectoryDisplaySpace() {
        const { currentDirectoryDisplayList } = this.state;
        return _.times(6 - currentDirectoryDisplayList.length, index => {
            return (
                <div
                    key={index}
                    className="directoryDisplayListSection--list--item"
                >
                    <div className="directoryDisplayListSection--list--item--image" />
                    <div className="directoryDisplayListSection--list--item--name" />
                </div>
            );
        });
    }

    renderEachDirectoryDisplay() {
        const { match } = this.props;
        const { currentDirectoryDisplayList } = this.state;

        return _.map(currentDirectoryDisplayList, item => {
            return (
                <Link
                    to={`/around/${match.params.id}/${item.id}`}
                    key={item.id}
                    style={{ textDecoration: 'none' }}
                >
                    <div
                        className="directoryDisplayListSection--list--item"
                        onClick={e => this.handleClick(e, item)}
                    >
                        <div
                            className="directoryDisplayListSection--list--item--image"
                            style={
                                !_.isEmpty(item.images_path[0]) && {
                                    backgroundImage: `url(${createImageURL(
                                        item.images_path[0]
                                    )})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }
                            }
                        />
                        <div className="directoryDisplayListSection--list--item--name">
                            <div className="directoryDisplayListSection--list--item--name--heading">
                                <span>{item.heading}</span>
                            </div>
                            <div className="directoryDisplayListSection--list--item--name--subheading">
                                <span>{item.subheading}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        });
    }

    processDirectoryOrder(action) {
        const { currentDirectoryDisplayList } = this.state;
        let processedDirectoryDisplayList = [...currentDirectoryDisplayList];
        if (action === 'down') {
            //get the last element via pop() and add to the begining of the array via unshift()
            processedDirectoryDisplayList.unshift(
                processedDirectoryDisplayList.pop()
            );
            this.setState({
                currentDirectoryDisplayList: processedDirectoryDisplayList
            });
        }

        if (action === 'up') {
            //get the first element via shift() and add to the end of the array via push()
            processedDirectoryDisplayList.push(
                processedDirectoryDisplayList.shift()
            );
            this.setState({
                currentDirectoryDisplayList: processedDirectoryDisplayList
            });
        }
    }

    render() {
        const { currentSection } = this.props;
        const { currentDirectoryDisplayList } = this.state;

        if (
            !_.isEmpty(currentSection) &&
            !_.isEmpty(currentDirectoryDisplayList)
        ) {
            return (
                <div className="main-section-animation">
                    <div className="directoryDisplayList--container">
                        <div className="directoryDisplayListSection directoryDisplayListSection--heading">
                            {currentSection.sections.name}
                        </div>
                        <div
                            className="directoryDisplayListSection directoryDisplayListSection--up directoryDisplayListSection--arrow"
                            onClick={() => {
                                this.processDirectoryOrder('up');
                            }}
                        >
                            <img
                                src={require(`../../images/arrowup.png`)}
                                width="100"
                                alt="arrow_up"
                            />
                        </div>
                        <div className="directoryDisplayListSection directoryDisplayListSection--list">
                            {currentSection.status === 200 &&
                                this.renderEachDirectoryDisplay()}
                            {currentSection.status === 200 &&
                                this.renderEmptyDirectoryDisplaySpace()}
                        </div>
                        <div
                            className="directoryDisplayListSection directoryDisplayListSection--down directoryDisplayListSection--arrow"
                            onClick={() => {
                                this.processDirectoryOrder('down');
                            }}
                        >
                            <img
                                src={require(`../../images/arrowdown.png`)}
                                width="100"
                                alt="arrow_down"
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <p>loading</p>;
        }
    }
}

function mapStateToProps({
    directoryDisplayList,
    sectionList,
    directoryDisplayListBySection,
    currentSection
}) {
    return {
        directoryDisplayList,
        sectionList,
        directoryDisplayListBySection,
        currentSection
    };
}

export default connect(mapStateToProps, actions)(DirectoryDisplayList);
