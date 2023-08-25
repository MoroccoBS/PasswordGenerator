import { motion, AnimatePresence } from "framer-motion";
import PasswordSaved from "../components/PasswordSaved";
import { randomId } from "@mantine/hooks";
import { decryptPassword } from "../Decryption";
interface SavedProps {
  filteredItems: Array<{
    name: string;
    password: string;
    website: string;
    id: string;
  }>;
  deleteItem(id: string): void;
  loadingDelete: boolean;
}

function Saved({ filteredItems, deleteItem, loadingDelete }: SavedProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="mt-5 h-ful w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {filteredItems.map((item) => (
          <PasswordSaved
            key={randomId()}
            name={item.name}
            password={decryptPassword(item.password)}
            website={item.website}
            deleteItem={() => deleteItem(item.id)}
            loadingDelete={loadingDelete}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default Saved;
