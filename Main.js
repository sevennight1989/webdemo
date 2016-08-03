/**
 * Created by uiprj on 16-8-1.
 */

import React, {Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import PagerTitleIndicator from './indicator/PagerTitleIndicator';
import IndicatorViewPager from './IndicatorViewPager';
import ProductPreview from './ProductPriview';
import AddProduct from './AddProduct';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
} from 'react-native';

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;
export default  class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'gallery',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    }

    componentDidMount() {
        this.setData();

    }

    setData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                    loaded: true,
                });
            })
            .done();
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['精选展示', '最近更新']}/>;
    }


    _onPressButton(id,movie){
        this.props.navigator.push({
            name:'ProductPreview',
            component: ProductPreview,
            params: {
                id: id,
                imagesource: movie.posters.thumbnail,
            }
        });
    }

    _addProduct(action){
        if(action==0){
            alert("搜索");
        }else{
            this.props.navigator.push({
                name:'AddProduct',
                component: AddProduct,
            });
        }

    }

    renderMovie(movie, sectionDI, rowID) {

        return <View style={styles.gallery_item_style}>
            <View style={styles.gallery_item_top}>
                <Image style={styles.gallery_item_icon} source={require('./res/touxiang2.jpg')}/>
                <View style={styles.gallery_item_content}>
                    <Text style={styles.gallery_item_name}>乔乔妞妞</Text>
                    <Text style={styles.gallery_item_info} numberOfLines={1}>创作年龄5岁 上海 浦东新区少年宫</Text>
                </View>
                <Text style={styles.gallery_item_date} numberOfLines={1}>2016-02-01</Text>
            </View>
            <TouchableOpacity onPress={this._onPressButton.bind(this,rowID,movie)}>
                <Image style={styles.gallery_item_product} source={require('./res/zuoping.jpg')}/>
            </TouchableOpacity>

            <Text style={styles.gallery_item_produce_title}>《小蜗牛上树》</Text>
            <Text style={styles.gallery_item_produce_info}>冰人和火人被困在一个恐怖的地方,他们齐心协力一起找到终点，回到他们的家</Text>
            <View>
            </View>
        </View>;
    }



    render() {
        var GalleryView;
        if (this.state.loaded) {
            GalleryView = <View style={styles.container}>
                <View style={styles.gallery_title_root}>
                    <Text style={styles.gallery_title_empty}></Text>
                    <Text style={styles.gallery_title_text}>小小画廊</Text>

                    <View style={styles.gallery_title_touch_parent}>

                        <TouchableOpacity onPress={this._addProduct.bind(this,0)}>
                        <Image style={styles.gallery_title_search} source={require('./res/search.png')}
                               resizeMode={"stretch"}/>
                            </TouchableOpacity>
                        <TouchableOpacity onPress={this._addProduct.bind(this,1)}>
                            <Image style={styles.gallery_title_add} source={require('./res/add.png')}
                                   resizeMode={"stretch"}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <IndicatorViewPager
                    style={{flex: 1}}
                    indicator={this._renderTitleIndicator()}>
                    <View>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderMovie.bind(this)}/>
                    </View>
                    <View>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderMovie.bind(this)}/>
                    </View>
                </IndicatorViewPager>

            </View>
        }
        else {
            GalleryView = <View style={styles.container}>
                <View style={styles.gallery_title_root}>
                    <Text style={styles.gallery_title_empty}></Text>
                    <Text style={styles.gallery_title_text}>小小画廊</Text>
                    <View style={styles.gallery_title_touch_parent}>
                        <TouchableOpacity onPress={this._addProduct.bind(this,0)}>
                            <Image style={styles.gallery_title_search} source={require('./res/search.png')}
                                   resizeMode={"stretch"}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._addProduct.bind(this,1)}>
                            <Image style={styles.gallery_title_add} source={require('./res/add.png')}
                                   resizeMode={"stretch"}/>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        }


        var movementView = <View style={styles.container}>
            <Text style={styles.welcome}>
                活动
            </Text>
        </View>

        var programView = <View style={styles.container}>
            <Text style={styles.welcome}>
                节目
            </Text>
        </View>

        var personalView = <View style={styles.container}>
            <Text style={styles.welcome}>
                个人专区
            </Text>
        </View>


        return (

            <TabNavigator >

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'gallery'}
                    title="小小画廊"
                    renderIcon={() => <Image style={styles.gallery_bottom_icon} source={require('./res/tab_weixin_normal.png')}/>}
                    renderSelectedIcon={() => <Image style={styles.gallery_bottom_icon} source={require('./res/tab_weixin_pressed.png')}/>}
                    onPress={() => this.setState({selectedTab: 'gallery'})}>
                    {GalleryView}
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'movement'}
                    title="活动"
                    renderIcon={() => <Image style={styles.gallery_bottom_icon} source={require('./res/tab_address_normal.png')}/>}
                    renderSelectedIcon={() => <Image style={styles.gallery_bottom_icon} source={require('./res/tab_address_pressed.png')}/>}
                    onPress={() => this.setState({selectedTab: 'movement'})}>
                    {movementView}
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'program'}
                    title="节目"
                    renderIcon={() => <Image style={styles.gallery_bottom_icon} source={require('./res/tab_find_frd_normal.png')}/>}
                    renderSelectedIcon={() => <Image style={styles.gallery_bottom_icon} source={require('./res/tab_find_frd_pressed.png')}/>}
                    onPress={() => this.setState({selectedTab: 'program'})}>
                    {programView}
                </TabNavigator.Item>

                <TabNavigator.Item
                    selected={this.state.selectedTab === 'personal'}
                    title="个人专区"
                    renderIcon={() => <Image style={styles.gallery_bottom_icon} source={require('./res/tab_settings_normal.png')}/>}
                    renderSelectedIcon={() => <Image style={styles.gallery_bottom_icon} source={require('./res/tab_settings_pressed.png')}/>}
                    onPress={() => this.setState({selectedTab: 'personal'})}>
                    {personalView}
                </TabNavigator.Item>

            </TabNavigator>






        );
    }
}
const styles = StyleSheet.create({

    init: {
        flex: 1,
    },

    container: {
        flex: 1,
        backgroundColor: '#D3D3D3',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    gallery_bottom_icon:{
        width:25,
        height:25,
    },

    gallery_title_root: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#FFD700',
        alignItems: 'center',
    },

    gallery_title_empty: {
        flex: 1,
    },

    gallery_title_text: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center'
    },

    gallery_title_touch_parent: {
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end',
    },

    gallery_title_search: {
        height: 25,
        width: 25,
        marginRight: 10,
    },

    gallery_title_add: {
        height: 25,
        width: 25,
        marginRight: 10,
    },

    gallery_item_style: {
        marginLeft: 10,
        marginTop: 8,
        marginRight: 10,
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },


    gallery_item_top: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    gallery_item_icon: {
        height: 36,
        width: 36,
        marginLeft: 10,
        borderRadius: 18,
    },
    gallery_item_content: {
        flex: 3,
        marginLeft: 10,
    },
    gallery_item_date: {
        flex: 1,
        fontSize: 12,
        color: '#8A8A8A',
    },

    gallery_item_name: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    gallery_item_info: {
        fontSize: 13,
    },

    gallery_item_product: {
        marginTop: 3,
        marginBottom: 3,
    },

    gallery_item_produce_title: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 15,
    },
    gallery_item_produce_info: {},

    gallery_viewpager: {
        flex: 1,
    }
});
