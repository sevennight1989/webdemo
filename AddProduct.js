/**
 * Created by uiprj on 16-8-3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

export default class AddProduct extends Component {

    constructor(props) {
        super(props);
    }

    _publish(action) {
        if (action == 0) {
            const {navigator} = this.props;
            if (navigator) {
                navigator.pop();
            }
        }
        else {
            alert("发布作品");
        }
    }

    render() {
        return (

            <View style={styles.container}>

                <View style={styles.product_title_root}>
                    <View style={styles.product_title_cancel}>
                        <TouchableOpacity style={styles.product_title_cancel_touch}
                                          onPress={this._publish.bind(this, 0)}>
                            <Text style={styles.product_title_cancel_text}>取消</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.product_title_text}>发布作品</Text>
                    <View style={styles.product_title_publish}>
                        <TouchableOpacity style={styles.product_title_publish_touch}
                                          onPress={this._publish.bind(this, 1)}>
                            <Text style={styles.product_title_publish_text}>发布</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.product_content_image_root}>
                    <Image style={styles.product_content_image} source={require('./res/add.png')}/>
                </View>

            </View>

        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    product_title_root: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#FFD700',
        alignItems: 'center',
    },
    product_title_cancel: {
        flex: 1,
    },
    product_title_text: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
    },
    product_title_publish: {
        flex: 1,
    },
    product_title_publish_text: {
        fontSize: 18,

    },
    product_title_cancel_text: {
        fontSize: 18,
        marginLeft: 10,
    },
    product_title_publish_touch: {
        width: 50,
        alignSelf: 'flex-end',
    },
    product_title_cancel_touch: {
        width: 50,
        alignSelf: 'flex-start',
    },
    product_content_image_root:{
        flex:1,
    },
    product_content_image:{
        width:100,
        height:100,
    },


});