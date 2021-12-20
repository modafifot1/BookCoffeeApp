import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {VolunmButton, AddButton, BuyButton} from "../components/MyButton"

const item = {"confirmed": true,
"_id": "60a5ecdd98cf780015b07baa",
"typeId": 2,
"name": "Soda bạc hà6",
"unitPrice": 20001,
"imageUrl": "https://res.cloudinary.com/dacnpm17n2/image/upload/v1621486813/n5zcnq6hwkx0vnlwdl0t.jpg",
"discountOff": 5,
"description": "Hương vị tươi ngon, 100% hương liệu từ thiên nhiên",
"discountMaximum": 5000,
"createAt": "2021-05-20T05:00:13.401Z",
"__v": 0,
"numOfFeedbacks": 1,
"numOfStars": 5}
export const SwipperDetail = ({navigation, onClose}) =>{
    const [quantity, setQuantity] = useState(0);
    const onBuyNow = () =>{
        navigation.navigate("CartStack");
        onClose();
    }
    const onCart = () =>{
      onClose();  
    }
    return (
        <View style = {styles.swipper}>
            <View style = {styles.SwipperContainer}>
            <View style={styles.img}>
                
                <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
          ></Image>
                
            </View>
            <View style={styles.content}>
                <View>
                    <Text style ={{fontSize: 18}}>{item.name}</Text>
                </View>
                <View>
                    <Text style ={{fontSize: 18}}>{item.unitPrice}</Text>
                </View>
                <View style = {styles.controlButton}>
                    <VolunmButton quantity = {quantity} setQuantity = {setQuantity}></VolunmButton>
                    <AddButton onPress={onCart}></AddButton>
                </View>
                <View >
                
            </View> 
            
            </View>
            
            </View> 
            <BuyButton label="Mua ngay" onPress = {onBuyNow}></BuyButton>  
        </View>
    )
}

const styles = StyleSheet.create({
    swipper:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: "center",
        marginHorizontal: 30,
        marginVertical:50
    },
    SwipperContainer: {
        flexDirection: "row",
        alignItems:"center",
    },
    img:{
        width: 120,
        height: 120,
        alignSelf: "flex-start"
    },
    content:{
        justifyContent: "space-between",
        height: "80%",
        marginLeft: 40,
        width: "50%"
    },
    controlButton:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
    }

})