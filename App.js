import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', completed: false, description: 'Finish React Native assignment' },
    { key: '2', completed: true, description: 'Watch Expo tutorial' },
    { key: '3', completed: false, description: 'Push project to GitHub' },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (key) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      ...prev,
      {
        key: Date.now().toString(),
        completed: false,
        description: trimmed,
      },
    ]);
    setNewTask('');
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.taskRow} onPress={() => toggleTask(item.key)}>
      <Text style={styles.checkbox}>{item.completed ? '☑' : '☐'}</Text>
      <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
        {item.description}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Todo List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputRow: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
  },
  checkbox: {
    fontSize: 20,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#777',
  },
});