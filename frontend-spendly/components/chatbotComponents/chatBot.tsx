import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { COLOR } from "../../constants/colors";
import { ENV } from "../../env";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const inputScrollRef = useRef<ScrollView>(null);

  // auto scroll ke bawah saat reply berubah
  useEffect(() => {
    if (reply) {
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [reply]);

  const fetchReply = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setReply("Menunggu jawaban AI...");

    try {
      const res = await fetch(`${ENV.API_URL}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setReply(data.reply);
      } else {
        setReply(data.error || "AI tidak memberikan respons.");
      }
    } catch (error) {
      console.error(error);
      setReply("Gagal menghubungi server AI.");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  // auto scroll ke bawah di dalam input jika teks melebihi tinggi
  useEffect(() => {
    inputScrollRef.current?.scrollToEnd({ animated: false });
  }, [message]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={{ flexDirection: "column", marginTop: 10, alignItems: "center" }}>
        <MaterialIcons name="flutter-dash" size={50} color={COLOR.white} />
        <Text style={styles.title}>Wealthy Monkey</Text>
      </View>

      {/* Area Balasan */}
      <View style={styles.reply}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 15 }}
        >
          {reply ? (
            <Markdown style={markdownStyles as any}>{reply}</Markdown>
          ) : (
            <Text style={styles.placeholderText}>
              Tanyakan apa saja seputar finansial 💬
            </Text>
          )}
        </ScrollView>
      </View>

      {/* Input */}
      <View style={styles.inputContainer}>
        <ScrollView
          ref={inputScrollRef}
          showsVerticalScrollIndicator={true}
          style={styles.inputScroll}
          nestedScrollEnabled
        >
          <TextInput
            style={styles.input}
            placeholder="Ketik pesanmu..."
            placeholderTextColor="#ccc"
            value={message}
            onChangeText={setMessage}
            editable={!loading}
            multiline
          />
        </ScrollView>

        <TouchableOpacity
          style={[styles.sendButton, loading && { opacity: 0.6 }]}
          onPress={fetchReply}
          disabled={loading}
        >
          <MaterialIcons name="send" size={28} color={COLOR.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

/* Styles */
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "90%",
    height: "80%",
    left: "5%",
    top: "5%",
    backgroundColor: COLOR.secondary,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLOR.white,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOR.white,
  },
  reply: {
    marginTop: 20,
    borderRadius: 15,
    width: "90%",
    height: "60%",
    backgroundColor: COLOR.black,
  },
  placeholderText: {
    color: "#aaa",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "90%",
    marginTop: 15,
    backgroundColor: COLOR.black,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  inputScroll: {
    flex: 1,
    maxHeight: 100, // <== batas tinggi maksimal input
  },
  input: {
    color: COLOR.white,
    fontSize: 16,
    textAlignVertical: "top",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: COLOR.tertiary,
    borderRadius: 50,
    padding: 8,
  },
});

/* Markdown styles */
const markdownStyles = {
  body: {
    color: COLOR.green,
    fontSize: 16,
    lineHeight: 22,
  },
  strong: {
    fontWeight: "700",
    color: COLOR.white,
  },
  em: {
    fontStyle: "italic",
    color: COLOR.white,
  },
  heading1: {
    fontSize: 22,
    fontWeight: "700",
    color: COLOR.tertiary,
  },
  heading2: {
    fontSize: 18,
    fontWeight: "700",
    color: COLOR.white,
  },
  heading3: {
    fontSize: 16,
    fontWeight: "700",
    color: COLOR.white,
  },
  bullet_list_icon: {
    color: COLOR.tertiary,
  },
  code_inline: {
    backgroundColor: "#222",
    color: "#0ff",
    paddingHorizontal: 6,
    borderRadius: 4,
    fontFamily: "monospace",
  },
  code_block: {
    backgroundColor: "#0b0b0b",
    color: "#0ff",
    padding: 12,
    borderRadius: 10,
    fontFamily: "monospace",
  },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: COLOR.tertiary,
    paddingLeft: 10,
    color: "#ccc",
  },
};
