import React, { useContext } from "react";
import { GlobalContext } from "../contextAPI/GlobalState";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ListItem, Icon } from "react-native-elements";
const History = () => {
  const confirmStatus = "C";
  const pendingStatus = "P";
  const { transactions, deleteTransaction } = useContext(GlobalContext);
  const groupedTransactions = {};
  transactions.forEach((transaction) => {
    const date = transaction.date;
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = [transaction];
    } else {
      groupedTransactions[date].push(transaction);
    }
  });

  // In ra kết quả gom nhóm
  console.log(groupedTransactions);
  // Tạo đối tượng chứa thông tin tổng hợp theo ngà
  // Khởi tạo một đối tượng để lưu trữ dữ liệu gom nhóm
  const groupedExpenses = {};

  // Duyệt qua mảng "transactions"
  transactions.forEach((transaction) => {
    // Duyệt qua mảng "expenses" trong mỗi giao dịch
    transaction.expenses.forEach((expense) => {
      // Lấy giá trị của trường "title", "description", "location", "total", "date", "icon", "name" và "color" từ mục chi tiêu
      const { title, description, location, total, date } = expense;
      const { icon, name, color } = transaction;

      // Tách ngày, tháng và năm từ trường "date"
      const [year, month, day] = date.split("-");

      // Tạo khóa cho đối tượng groupedExpenses dựa trên ngày, tháng và năm
      const key = `${year}-${month}-${day}`;

      // Kiểm tra xem khóa đã tồn tại trong groupedExpenses chưa
      if (groupedExpenses[key]) {
        // Nếu khóa đã tồn tại, thêm expense vào mảng tương ứng
        groupedExpenses[key].push({
          id: expense.id,
          location,
          description,
          total,
          icon,
          name,
          color,
        });
      } else {
        // Nếu khóa chưa tồn tại, tạo khóa mới và gán một mảng chứa expense
        groupedExpenses[key] = [
          {
            id: expense.id,
            location,
            description,
            total,
            icon,
            name,
            color,
          },
        ];
      }
    });
  });
  const getFormattedDate = (date) => {
    const currentDate = new Date();
    const formattedDate = new Date(date);

    if (
      formattedDate.getDate() === currentDate.getDate() &&
      formattedDate.getMonth() === currentDate.getMonth() &&
      formattedDate.getFullYear() === currentDate.getFullYear()
    ) {
      return "Today";
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (
      formattedDate.getDate() === yesterday.getDate() &&
      formattedDate.getMonth() === yesterday.getMonth() &&
      formattedDate.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }

    return date;
  };
  return (
    <ScrollView>
      {transactions.map((category) => (
        <View key={category.id}>
          <View>
            <Text>{category.name}</Text>
            {category.expenses
              .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sắp xếp theo ngày cũ đến ngày mới
              .map((expense) => (
                <ListItem key={expense.id} bottomDivider>
                  <ListItem.Content>
                    <View style={styles.transaction}>
                      <View style={styles.transaction}>
                        <Image
                          source={category.icon}
                          style={{
                            width: 40,
                            height: 40,
                            marginRight: 10,
                            tintColor: category.color,
                          }}
                        ></Image>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#57606f",
                            fontWeight: "bold",
                          }}
                        >
                          {expense.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#a4b0be",
                          }}
                        >
                          {expense.location}
                        </Text>
                      </View>
                    </View>
                  </ListItem.Content>
                  <ListItem color="black">
                    <ListItem.Subtitle style={styles.title}>
                      -${Math.abs(expense.total)}
                    </ListItem.Subtitle>
                  </ListItem>
                </ListItem>
              ))}
          </View>
        </View>
      ))}
      {/* <Image
            style={styles.iconBgYellow}
            source={require("../../assets/shopping-bag.png")}
          ></Image>
          <View style={{ marginLeft: 10 }}>
            <Text>shopping</Text>
            <Text style={styles.textSmallGrey}>a</Text>
          </View>
        </View>
        <View style={{ marginLeft: 100, marginTop: 10 }}>
          <Text style={styles.textColorRed}>-100,000đ</Text>
          <Text style={styles.textSmallGrey}>10:00AM</Text>
        </View>
      </View> */}
      {/* <View>
        {transactions.map((category) => (
          <View key={category.id}>
            <Text>{category.name}</Text>
            {category.expenses.map((expense) => (
              <ListItem
                key={expense.id}
                style={[
                  {
                    borderLeftColor:
                      expense.status === pendingStatus ? "#e84118" : "#4cd137",
                  },
                  styles.list,
                ]}
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title style={styles.title}>
                    {expense.total < 0 ? "-" : "+"}${Math.abs(expense.total)}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.subtitle}>
                    <Text style={styles.text1}>{expense.title}</Text>
                    <Text style={styles.text2}>{`\n` + expense.location}</Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem color="black">
                  <Icon
                    name="delete-forever"
                    type="material-icons"
                    size={28}
                    color="#EA2027"
                    onPress={() => deleteTransaction(category.id, expense.id)}
                  />
                </ListItem>
              </ListItem>
            ))}
          </View>
        ))}
      </View> */}
      {/* <View>
        {transactions.map((transaction) => (
          <ListItem
            key={transaction.id}
            style={[
              {
                borderLeftColor: `${
                  transaction.amount < 0 ? "#e84118" : "#4cd137"
                }`,
              },
              styles.list,
            ]}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {transaction.amount < 0 ? `-` : `+`}$
                {Math.abs(transaction.amount)}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>
                <Text style={styles.text1}>{transaction.text}</Text>
                <Text style={styles.text2}>{`\n` + transaction.time}</Text>
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem color="black">
              <Icon
                name="delete-forever"
                type="material-icons"
                size={28}
                color="#EA2027"
                onPress={() => deleteTransactions(transaction.id)}
              />
            </ListItem>
          </ListItem>
        ))}
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    borderLeftWidth: 5,
    marginTop: 2,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
  subtitle: {
    marginLeft: 10,
  },
  text1: { fontSize: 16, color: "#57606f", fontWeight: "bold" },
  text2: { fontSize: 12, marginTop: 1, color: "#a4b0be" },
  transaction: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textColorRed: {
    color: "red",
    fontWeight: "bold",
  },
  textSmallGrey: {
    color: "grey",
    fontSize: 10,
  },
  iconBgYellow: {
    backgroundColor: "#f5edb5",
    borderRadius: 10,
    padding: 5,
  },
});

export default History;
