import React, { useState } from 'react';
import { SafeAreaView, View, Text, Pressable, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';

const presets = [
  { name: 'Original', color: 'transparent' },
  { name: 'Warm', color: 'rgba(255,150,65,0.18)' },
  { name: 'B&W', color: 'rgba(0,0,0,0.32)' },
  { name: 'Cool', color: 'rgba(75,145,255,0.20)' },
  { name: 'Cinema PRO', color: 'rgba(80,40,90,0.28)', pro: true },
  { name: 'Rose PRO', color: 'rgba(255,90,145,0.20)', pro: true },
];

export default function App() {
  const [photo, setPhoto] = useState(null);
  const [preset, setPreset] = useState(presets[0]);
  const [pro, setPro] = useState(false);

  async function choosePhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, quality: 1 });
    if (!result.canceled) setPhoto(result.assets[0]);
  }
  async function savePhoto() {
    if (!photo) return Alert.alert('Choose a photo first', 'Pick a picture to begin editing.');
    if (preset.color !== 'transparent') return Alert.alert('Export is being built', 'This preview currently shows the preset overlay. Filter baking and real subscriptions are not implemented yet.');
    const permission = await MediaLibrary.requestPermissionsAsync(true);
    if (!permission.granted) return Alert.alert('Permission needed', 'Allow photo-library access to save pictures.');
    await MediaLibrary.saveToLibraryAsync(photo.uri);
    Alert.alert('Saved', 'Your original photo was saved. Preset effects are preview-only in this starter build.');
  }

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={s.page}>
        <View style={s.top}><View><Text style={s.kicker}>VANTA STUDIO</Text><Text style={s.title}>Vanta Edit</Text></View><Text style={s.badge}>BETA</Text></View>
        <Text style={s.sub}>Make the ordinary look cinematic.</Text>
        <Pressable style={s.canvas} onPress={choosePhoto}>
          {photo ? <><Image source={{uri: photo.uri}} style={s.photo} resizeMode="contain"/><View pointerEvents="none" style={[s.tint,{backgroundColor:preset.color}]}/></> : <><Text style={s.plus}>＋</Text><Text style={s.pickTitle}>Choose a photo</Text><Text style={s.muted}>Tap here to open your photo library</Text></>}
        </Pressable>
        <Pressable style={s.primary} onPress={choosePhoto}><Text style={s.primaryText}>{photo ? 'CHANGE PHOTO' : 'SELECT PHOTO'}</Text></Pressable>
        <Text style={s.section}>PRESETS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.presetRow}>
          {presets.map(p => <Pressable key={p.name} onPress={() => { if(p.pro && !pro) return Alert.alert('Vanta Pro', 'Paid subscriptions are not connected yet.'); setPreset(p); }} style={[s.preset,preset.name===p.name&&s.presetActive]}><View style={[s.swatch,{backgroundColor:p.color==='transparent'?'#27272a':p.color}]}/><Text style={s.presetText}>{p.name}</Text></Pressable>)}
        </ScrollView>
        <View style={s.proCard}><View style={{flex:1}}><Text style={s.proTitle}>Vanta Pro</Text><Text style={s.muted}>Premium looks · Coming soon</Text></View><Pressable style={s.proButton} onPress={()=>Alert.alert('Coming soon','Real App Store and Google Play subscriptions will be added after the editing and store setup is tested.')}><Text style={s.proButtonText}>EXPLORE</Text></Pressable></View>
        <Pressable style={s.secondary} onPress={savePhoto}><Text style={s.secondaryText}>SAVE PHOTO</Text></Pressable>
        <Text style={s.foot}>Early native prototype • Editing effects and billing are not final.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#09090b'},page:{padding:22,paddingBottom:40},top:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:12},kicker:{color:'#a1a1aa',fontSize:10,letterSpacing:3,fontWeight:'800'},title:{color:'#fafafa',fontSize:30,fontWeight:'800',marginTop:5},badge:{color:'#d4d4d8',borderWidth:1,borderColor:'#3f3f46',borderRadius:9,paddingHorizontal:10,paddingVertical:6,fontSize:10},sub:{color:'#a1a1aa',marginTop:8,marginBottom:22,fontSize:14},canvas:{height:350,borderRadius:24,borderWidth:1,borderColor:'#27272a',backgroundColor:'#18181b',alignItems:'center',justifyContent:'center',overflow:'hidden'},photo:{width:'100%',height:'100%'},tint:{...StyleSheet.absoluteFillObject},plus:{fontSize:38,color:'#e4e4e7',marginBottom:8},pickTitle:{color:'#fafafa',fontSize:18,fontWeight:'700'},muted:{color:'#a1a1aa',fontSize:12,marginTop:6},primary:{backgroundColor:'#f4f4f5',borderRadius:14,padding:16,alignItems:'center',marginTop:14},primaryText:{color:'#09090b',fontWeight:'900',fontSize:12,letterSpacing:1.5},section:{color:'#a1a1aa',fontSize:11,letterSpacing:2,fontWeight:'800',marginTop:28,marginBottom:12},presetRow:{gap:10},preset:{width:105,backgroundColor:'#18181b',padding:10,borderRadius:14,borderWidth:1,borderColor:'#27272a'},presetActive:{borderColor:'#fafafa'},swatch:{height:55,borderRadius:8,marginBottom:10},presetText:{color:'#f4f4f5',fontSize:11,fontWeight:'700'},proCard:{flexDirection:'row',alignItems:'center',padding:16,backgroundColor:'#18181b',borderRadius:18,marginTop:25,borderWidth:1,borderColor:'#3f3f46'},proTitle:{color:'#fafafa',fontSize:17,fontWeight:'800'},proButton:{backgroundColor:'#f4f4f5',borderRadius:10,paddingHorizontal:12,paddingVertical:10},proButtonText:{color:'#09090b',fontSize:10,fontWeight:'900'},secondary:{borderColor:'#52525b',borderWidth:1,borderRadius:14,padding:16,alignItems:'center',marginTop:14},secondaryText:{color:'#fafafa',fontWeight:'800',letterSpacing:1.2,fontSize:12},foot:{color:'#71717a',fontSize:11,textAlign:'center',marginTop:18,lineHeight:17}});
