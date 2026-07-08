"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ConfirmTableDialog({
  tableNumber,
  onConfirm,
  onCancel,
}: {
  tableNumber: number | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {tableNumber !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/50 backdrop-blur-sm px-6"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-paper shadow-soft p-8 text-center"
          >
            <h3 className="font-display text-2xl text-espresso">
              Confirm Table {tableNumber}?
            </h3>
            <p className="mt-3 text-sm text-espresso/60">
              Your order will be sent to the kitchen for this table. You can
              change it before placing the order.
            </p>
            <div className="mt-7 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="default" className="flex-1" onClick={onConfirm}>
                Confirm
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
